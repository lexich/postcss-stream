import { Node } from "postcss";
import CNode from "./node";
export interface StreamQuery {
    decl?: string | string[] | QDeclaration | QDeclaration[];
    rule?: string;
}
export interface StreamFunctor {
    (child: CNode | Node): void;
}
export interface Stream {
    query: StreamQuery;
    fn: StreamFunctor;
}
export interface QDeclaration {
    prop: string | RegExp;
    value?: string | RegExp;
}
export interface Query {
    decl: QueryExpression[];
    rule: QueryExpression[];
}
export interface LinkedNodes<T> {
    data?: T;
    next?: LinkedNodes<T>;
}
export interface QueryExpression {
    type: string;
    value: QDeclaration[] | QRule[];
    next?: QueryExpression;
    tailBuffer?: LinkedNodes<MNode>;
    rootBuffer: LinkedNodes<MNode>;
    fn: StreamFunctor;
}
export declare type StreamDeclaration = string | string[] | QDeclaration | QDeclaration[];
export declare type StringOrRegexp = string | RegExp;
export declare type StreamRule = StringOrRegexp | StringOrRegexp[];
export declare type QRule = StreamRule;
export interface MNode extends Node {
    __meta__?: {
        expressions: QueryExpression[];
    };
}
