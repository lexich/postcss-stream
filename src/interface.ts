import { Node, Declaration } from "postcss";
import { LinkedItemList } from "./linkedlist";
import StreamPipe from "./walker";


export type StringOrRegexp = string | RegExp;
export type StringOrRegexpOrFunction = StringOrRegexp | StreamFunctor<string, boolean>;
export interface StreamFunctor<Input, T> {
    (child: Input): T;
}

export type QueryProperty = StringOrRegexpOrFunction | StringOrRegexpOrFunction[];

export interface QDeclaration {
    prop?: QueryProperty;
    value?: QueryProperty;
}

export interface QueryDeclarationDefinition extends QDeclaration {
    array?: QDeclaration[];
    enter: StreamFunctor<Node | Declaration, void>;
}

export interface QueryDeclaration {
    decl: QueryDeclarationDefinition | QueryDeclarationDefinition[];
}

export interface QueryRuleDefinition {
    selector: QueryProperty;
};

export interface QueryRule {
    rule: QueryDeclaration | QueryRuleDefinition;
}

export type Stream = QueryRule | QueryDeclaration;


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
    fn: StreamFunctor<Node | Declaration, void>;
    walker: StreamPipe;
    buffer: LinkedItemList<MNode>;
}

export type StreamDeclaration = string | string[] | QDeclaration | QDeclaration[];

export type QRule = StringOrRegexpOrFunction | StringOrRegexpOrFunction[];

export interface MNode extends Node {
    __meta__?: {
        proxy?: MNode,    
        expression?: QueryExpression
    };
}