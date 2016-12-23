import { Declaration, Rule, Node } from "postcss";
import { QueryExpression, QDeclaration, QRule } from "./interface";

export default function match(node: Node, expr: QueryExpression) {
    if (expr.type === "decl") {
        return this.matchDecl(node as Declaration, expr);
    } else if (expr.type === "rule") {
        return  this.matchRule(node as Rule, expr);
    }
}

export function cmp(matcher: RegExp | string, prop: string): boolean {
    if (matcher instanceof RegExp) {
        return matcher.test(prop);                    
    } else {
        if (matcher === "*") {
            return true;
        } else {
            return matcher === prop;
        }
    }
}

export function matchDecl(decl: Declaration, expr: QueryExpression): boolean {
    for (let item of expr.value as QDeclaration[]) {
        if (!cmp(item.prop, decl.prop)) {
            continue;
        }
        if (item.value !== undefined && !cmp(item.value, decl.value)) {
            continue;
        } 
        if (expr.next) {
            if (expr.next.type === "rule" && decl.parent) {
                if (!this.matchRule(decl.parent as Rule, expr.next)) {
                    continue;
                }
            } else {
                continue;
            }
        }
        return true;
    }
    return false;
}

export function matchRule(rule: Rule, expr: QueryExpression): boolean {
    for (let item of expr.value as QRule[]) {
        // TODO: fix according postcss
        if (Array.isArray(item)) {
            for (let subitem of item) {
                if (cmp(subitem, rule.selector)) {
                    return true;
                }
            }
        } else {
            if (cmp(item, rule.selector)) {
                return true;
            }
        }   
    }
    return false;
}