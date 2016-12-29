import { Node, Declaration, Rule } from "postcss";
import { LinkedItemList } from "./linkedlist";
import StreamPipe from "./streampipe";


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

export interface DefinitionBase<TNode> {
    reference?: any;
    enter?: StreamFunctor<TNode, void>;
    leave?: StreamFunctor<TNode, void>;
}

export interface QueryDeclarationDefinition extends QDeclaration, DefinitionBase<Declaration | MNode> {
    array?: QDeclaration[];
}

export interface QueryDeclaration {
    decl: QueryDeclarationDefinition | QueryDeclarationDefinition[];
}

export interface QueryRuleDefinition extends DefinitionBase<Rule | MNode> {
    selector: QueryProperty;
};

export interface QueryRule {
    rule: QueryRuleDefinition & QueryDeclaration;
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
    enter?: StreamFunctor<MNode, void>;
    leave?: StreamFunctor<MNode, void>;
    walker: StreamPipe;
}

export type StreamDeclaration = string | string[] | QDeclaration | QDeclaration[];

export type QRule = StringOrRegexpOrFunction | StringOrRegexpOrFunction[];

export interface MNode extends Node {
    __meta__?: {
        proxy?: MNode,
        pipe: StreamPipe,
        skip: boolean,
        expression?: QueryExpression
        stage: "enter" | "leave" | null
    };
}