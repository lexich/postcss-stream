import { Declaration, Rule, Node } from "postcss";
import { QueryExpression, QDeclarationMatcher, MNode } from "./interface";
export declare function sendNodeNext(node: MNode): void;
export default function match(node: Node, expr: QueryExpression): boolean;
export declare function cmp(matcher: QDeclarationMatcher, prop: string): boolean;
export declare function matchDecl(decl: Declaration, expr: QueryExpression): boolean;
export declare function matchRule(rule: Rule, expr: QueryExpression): boolean;
