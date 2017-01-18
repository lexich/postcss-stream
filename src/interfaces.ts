import * as postcss from "postcss";

export interface Visitor {
    ref: number;
    type: string;
    match: (node: postcss.Node) => boolean;
    fn?: (node: postcss.Node) => any;
    parent?: Visitor;
}

export interface VisitorContrainer {
    enter: Visitor[];
    leave: Visitor[];
}

export interface RefNode extends postcss.Node {
    _refEnter?: number;
    _refLeave?: number;
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



