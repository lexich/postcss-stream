import { Node } from "postcss";
import { LinkedItemList } from "./linkedlist";
import Walker from "./walker";
export interface StreamQuery {
    decl?: string | string[] | QDeclaration | QDeclaration[];
    rule?: string;
}

export  interface StreamFunctor {
    (child: Node): void;
}

export  interface Stream {
    query: StreamQuery;
    fn: StreamFunctor;
}

export type QDeclarationMatcher = RegExp | string | ((s:string) => boolean);

export interface QDeclaration {
    prop: QDeclarationMatcher;
    value?: QDeclarationMatcher;
}

export interface Query {
    decl: LinkedItemList<QueryExpression>;
    rule: LinkedItemList<QueryExpression>;
}

export interface LinkedNodes<T> {
    data?: T;
    next?: LinkedNodes<T>;
}

export interface QueryExpression {
    type: string;
    value: QDeclaration[] | QRule[];
    next?: QueryExpression;
    fn: StreamFunctor;
    walker: Walker;
    buffer: LinkedItemList<MNode>;
}

export type StreamDeclaration = string | string[] | QDeclaration | QDeclaration[];

export type StringOrRegexp = string | RegExp;
export type StreamRule = StringOrRegexp | StringOrRegexp[];
export type QRule = StreamRule;

export interface MNode extends Node {
    __meta__?: {
        expression: QueryExpression
    };
}