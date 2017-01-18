import * as postcss from "postcss";

interface Stack {
    prev: Stack | null;
    node: postcss.Node;
    index: number;
}

let STACK_CACHE: Stack;

export function fastIterator(css: postcss.Root, callback: (child: postcss.Node, index: number, enter: boolean) => any): any {
    if (!css.nodes) {
        return undefined;
    }
    let stack: Stack = {
        prev: null,
        node: css,
        index: 0
    };
    let stackTmp: Stack;
    let reverseWalk = false;
    do {
        if (!reverseWalk) {
            callback(stack.node, stack.index, true);
            if ((stack.node as postcss.Container).nodes &&
                (stack.node as postcss.Container).nodes.length > 0) {
                if (STACK_CACHE) {
                    stackTmp = STACK_CACHE;
                    STACK_CACHE = STACK_CACHE.prev;
                } else {
                    stackTmp = { prev: null, node: null, index: 0, };
                }
                stackTmp.prev = stack;
                stackTmp.node = (stack.node as postcss.Container).nodes[0];
                stackTmp.index = 0;
                stack = stackTmp;
                stackTmp = null;
                // go deeper
                continue;
            }
            reverseWalk = false;
        }
        callback(stack.node, stack.index, false);
        // try go next node
        if (stack.prev) {
            stack.index += 1;
            if (stack.index < (stack.prev.node as postcss.Container).nodes.length) {
                stack.node = (stack.prev.node as postcss.Container).nodes[stack.index];
                // iterate
                continue;
            }
        }
        // up to stack
        stackTmp = stack;
        stack = stack.prev;
        STACK_CACHE = stackTmp;
        stackTmp = null;
        //
        reverseWalk = true;
    } while (!!stack);
}

interface Visitor {
    refEnter: number;
    refLeave: number;
    type: string;
    match: (node: postcss.Node) => boolean;
    enter?: (node: postcss.Node) => any;
    leave?: (node: postcss.Node) => any;
    parent?: Visitor;
}

interface RefNode extends postcss.Node {
    _ref: number;
}

export function traverse(css: postcss.Root, queries: Query[]) {
    let isDirty: boolean;
    let ref: number = 0;

    const match = function(node: postcss.Node, visit: Visitor) {
        if (!visit.match(node)) { return false; }
        let vParent = visit.parent;
        let nParent = node.parent;
        while(vParent) {
            if (!vParent.match(nParent)) { return false; }
            vParent = vParent.parent;
            nParent = nParent.parent;
        }
        return true;
    };

    const iterateVisitors = function(node: postcss.Node, index: number, enter: boolean, visitors: Visitor[]) {
        ref = (node as RefNode)._ref || 0;
        let newRef = ref;
        for (let visit of visitors) {
            // skip visitor if it isn't in scope
            if (enter) {
                if (ref + 1 !== visit.refEnter) {
                    continue;
                }
                newRef = visit.refEnter;
            } else {
                if (ref + 1 !== visit.refLeave) {
                    continue;
                }
                newRef = visit.refLeave;
            }

            if (!ref && ref >= visit.refLeave) {
                // all visit were marked node
                continue;
            }
            if (enter && visit.enter && ref < visit.refEnter) {
                if (match(node, visit)) {
                    // if visitor executed ast is dirty
                    isDirty = true;
                    visit.enter(node);
                }
            } else if (!enter && visit.leave) {
                if (match(node, visit)) {
                    // if visitor executed ast is dirty
                    isDirty = true;
                    visit.leave(node);
                }
            }
            (node as RefNode)._ref = newRef;
        }
    };
    const iter = { val: 0 };
    const visitors = queries.reduce<Visitor[]>((memo, query)=> {
        const visitors = compile(query, iter);
        if (visitors) {
            for (let visit of visitors) {
                memo[memo.length] = visit;
            }
        }
        return memo;
    }, []);


    const iterate = function (node: postcss.Node, index: number, enter: boolean) {
        return iterateVisitors(node, index, enter, visitors);
    };

    do {
        isDirty = false;
        fastIterator(css, iterate);
    } while(isDirty);
}

export type Query = QueryDeclaration | QueryRule | QueryAtRule | QueryComment | QueryRoot | null;
export interface MatcherFunctor {
    (node: postcss.Node): boolean;
}

export type MatcherType = string | string[] | RegExp | RegExp[] | MatcherFunctor;

export interface QueryBaseType<T extends postcss.Node> {
    enter?: (child: T) => void;
    leave?: (child: T) => void;
    decl?: QueryBaseType<postcss.Declaration> & {
        important?: boolean;
        prop?: MatcherType;
        value?: MatcherType;
    };
    rule?: QueryBaseType<postcss.Rule> & {
        selector?: MatcherType;
    };
    atrule?: QueryBaseType<postcss.AtRule> & {
        name?: MatcherType;
        params?: MatcherType;
    };
    comment?: QueryBaseType<postcss.Comment> & {
        text?: MatcherType;
    };
    root?: QueryBaseType<postcss.Root>;
}

export interface QueryDeclaration extends QueryBaseType<postcss.Declaration> {}
export interface QueryRule extends QueryBaseType<postcss.Rule> {}
export interface QueryAtRule extends QueryBaseType<postcss.AtRule> {}
export interface QueryComment extends QueryBaseType<postcss.Comment> {}
export interface QueryRoot extends QueryBaseType<postcss.Root> {}

const ATTRS = ['decl', 'rule', 'atrule', 'comment', 'root'];
export function compile(query: Query, iter: {val: number}, parent?: Visitor): Visitor[] | null {
    if (!query) { return null; }
    let anyQuery: any;
    const visitors: Visitor[] = [];
    for (let type of ATTRS) {
        anyQuery = (query as any)[type];
        if (anyQuery) {
            const refEnter = ++iter.val;
            const visit: Visitor = {
                type,
                refEnter,
                refLeave: -1,
                enter: anyQuery.enter,
                leave: anyQuery.leave,
                parent,
                match: compileMatcher(query, type)
            };
            const children = compile(anyQuery, iter, visit);
            visit.refLeave = ++iter.val;
            visitors[visitors.length] = visit;
            for(let child of children) {
                visitors[visitors.length] = child;
            }
        }
    }
    return visitors;
}

export function comparator(cmp: MatcherType, prop: string, node: postcss.Node): boolean {
    if (cmp === null || cmp === undefined) {
        return true;
    } else if (typeof cmp === "string" || cmp instanceof String) {
        return cmp === prop;
    } else if (cmp instanceof RegExp) {
        return cmp.test(prop);
    } else if (cmp instanceof Function) {
        return (cmp as MatcherFunctor)(node);
    } else if (Array.isArray(cmp)) {
        for (let state of cmp) {
            if (comparator(state, prop, node)) {
                return true;
            }
        }
        return false;
    } else {
        // TODO add object quick expressions
        return false;
    }
}

const MATCHER = {
    decl({decl}: QueryDeclaration): MatcherFunctor {
        if (!decl) { return trueMatcher; }
        const { important, prop, value } = decl;
        return function(node: postcss.Declaration): boolean {
            if (!node || node.type !== "decl") { return false; }
            if (important !== undefined && important !== node.important) {
                return false;
            }
            if (prop !== undefined && !comparator(prop, node.prop, node)) {
                return false;
            }
            if (value !== undefined && !comparator(value, node.value, node)) {
                return false;
            }
            return true;
        };
    },
    rule({rule}: QueryRule): MatcherFunctor {
        if (!rule) { return trueMatcher; }
        const { selector } = rule;
        return function(node: postcss.Rule): boolean {
            if (!node || node.type !== "rule") { return false; }
            if (selector !== undefined) {
                let isMatch = false;
                for(let selector of node.selectors) {
                    if (comparator(selector, selector, node)) {
                        isMatch = true;
                        break;
                    }
                }
                if (!isMatch) { return false;}
            }
            return true;
        };
    },
    atrule({atrule}: QueryAtRule): MatcherFunctor {
        if (!atrule) { return trueMatcher; }
        const { name, params } = atrule;
        return function(node: postcss.AtRule): boolean {
            if (!node || node.type !== "atrule") { return false; }
            if (name !== undefined && !comparator(name, node.name, node)) {
                return false;
            }
            if (params !== undefined && !comparator(params, node.params, node)) {
                return false;
            }
            return true;
        };
    },
    comment({comment}: QueryComment): MatcherFunctor {
        if (!comment) { return trueMatcher; }
        const { text } = comment;
        return function(node: postcss.Comment): boolean {
            if (!node || node.type !== "comment") { return false; }
            if (text !== undefined && !comparator(text, node.text, node)) {
                return false;
            }
            return true;
        };
    },
    root(query: QueryRoot): MatcherFunctor {
        return trueMatcher;
    }
};

function trueMatcher(node: postcss.Node): boolean {
    return true;
}

export function compileMatcher(query: Query, type: string): MatcherFunctor {
    const matcher = (MATCHER as any)[type];
    if (matcher) {
        return matcher(query);
    } else {
        return trueMatcher;
    }
}
