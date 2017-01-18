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
    ref: number;
    type: string;
    match: (node: postcss.Node) => boolean;
    fn?: (node: postcss.Node) => any;
    parent?: Visitor;
}

interface VisitorContrainer {
    enter: Visitor[];
    leave: Visitor[];
}

interface RefNode extends postcss.Node {
    _refEnter?: number;
    _refLeave?: number;
}

export function traverse(css: postcss.Root, queries: Query[]) {
    let isDirty: boolean;
    const iter = { val: 1 };

    const visitors: VisitorContrainer = { enter: [], leave: [] };
    queries.forEach((query)=> {
        compile(query, iter, null, visitors);
    });

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

    const iterate = function(node: postcss.Node, index: number, enter: boolean) {
        let ref = (enter ? (node as RefNode)._refEnter : (node as RefNode)._refLeave) || 0;
        const arr = enter ? visitors.enter : visitors.leave;
        for(let visit of arr) {
            if (ref >= visit.ref) {
                continue;
            } else {
                ref = visit.ref;
            }
            if (visit.type !== node.type) { continue; }
            if (match(node, visit)) {
                isDirty = true;
                visit.fn(node);
            }
        }
        if (enter) {
            (node as RefNode)._refEnter = ref;
        } else {
            (node as RefNode)._refLeave = ref;
        }
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
export function compile(query: Query, iter: {val: number}, parent: Visitor, container: VisitorContrainer): VisitorContrainer | null {
    if (!query) { return null; }
    let anyQuery: any;
    if (!container) {
        container = { enter:[], leave: [] };
    }
    for (let type of ATTRS) {
        anyQuery = (query as any)[type];
        if (anyQuery) {
            const match = compileMatcher(query, type);
            const visitEnter = {
                type, match, parent,
                ref: iter.val,
                fn: anyQuery.enter,
            };
            iter.val += 1;
            if (visitEnter.fn) {
                container.enter[container.enter.length] = visitEnter;
            }
            compile(anyQuery, iter, visitEnter, container);
            if (anyQuery.leave) {
                container.leave[container.leave.length] =  {
                    type, match, parent,
                    ref: iter.val,
                    fn: anyQuery.leave,
                };
            }
            iter.val += 1;
        }
    }
    return container;
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

function trueMatcher(node: postcss.Node): boolean {
    return true;
}

const MATCHER = {
    decl({decl}: QueryDeclaration): MatcherFunctor {
        if (!decl) { return trueMatcher; }
        return function(node: postcss.Declaration): boolean {
            if (!node || node.type !== "decl") { return false; }
            if (this.important !== undefined && this.important !== node.important) {
                return false;
            }
            if (this.prop !== undefined && !comparator(this.prop, node.prop, node)) {
                return false;
            }
            if (this.value !== undefined && !comparator(this.value, node.value, node)) {
                return false;
            }
            return true;
        }.bind(decl);
    },
    rule({rule}: QueryRule): MatcherFunctor {
        if (!rule) { return trueMatcher; }
        return function(node: postcss.Rule): boolean {
            if (!node || node.type !== "rule") { return false; }
            if (this.selector !== undefined) {
                let isMatch = false;
                for(let item of node.selectors) {
                    if (comparator(this.selector, item, node)) {
                        isMatch = true;
                        break;
                    }
                }
                if (!isMatch) { return false;}
            }
            return true;
        }.bind(rule);
    },
    atrule({atrule}: QueryAtRule): MatcherFunctor {
        if (!atrule) { return trueMatcher; }
        return function(node: postcss.AtRule): boolean {
            if (!node || node.type !== "atrule") { return false; }
            if (this.name !== undefined && !comparator(this.name, node.name, node)) {
                return false;
            }
            if (this.params !== undefined && !comparator(this.params, node.params, node)) {
                return false;
            }
            return true;
        }.bind(atrule);
    },
    comment({comment}: QueryComment): MatcherFunctor {
        if (!comment) { return trueMatcher; }
        return function(node: postcss.Comment): boolean {
            if (!node || node.type !== "comment") { return false; }
            if (this.text !== undefined && !comparator(this.text, node.text, node)) {
                return false;
            }
            return true;
        }.bind(comment);
    },
    root(query: QueryRoot): MatcherFunctor {
        return trueMatcher;
    }
};

export function compileMatcher(query: Query, type: string): MatcherFunctor {
    const matcher = (MATCHER as any)[type];
    if (matcher) {
        return matcher(query);
    } else {
        return trueMatcher;
    }
}
