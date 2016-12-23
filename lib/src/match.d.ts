import { Declaration, Rule, Node } from "postcss";
import { QueryExpression } from "./interface";
export default function match(node: Node, expr: QueryExpression): any;
export declare function cmp(matcher: RegExp | string, prop: string): boolean;
export declare function matchDecl(decl: Declaration, expr: QueryExpression): boolean;
export declare function matchRule(rule: Rule, expr: QueryExpression): boolean;
