import { Declaration, Rule, Node } from "postcss";
import { QueryExpression, StreamFunctor, QueryProperty, QDeclaration, QRule, MNode,  } from "./interface";
import { expressionByType } from "./processQuery";
import { add, isEmpty } from "./linkedlist";
import { setMeta, getMeta, clearMeta } from "./meta";

export function sendNodeNext(node: MNode): void {
    let searcher = true;
    while (searcher) {
        searcher = false;
        const expression = getMeta<QueryExpression>(node, "expression");
        if (!expression) { return; }
        let {next} = expression;
        while (next) {
            if (match(node, next)) {
                setMeta(node, "expression", next);
                return; // process on next rule
            }
            next = next.next;
        }    
        let nextWalker = expression.walker.getNextWalker();
        let searcherWalker = true;
        while (searcherWalker) {
            searcherWalker = false;
            if (!nextWalker) {
                // clean meta information
                return clearMeta(node);
            }
            let list = expressionByType(nextWalker.query, expression.type);
            if (isEmpty(list)) {
                // clean meta information
                clearMeta(node);
                searcherWalker = true;
                continue; // nextWalker
            } else {
                ;
                const expression = setMeta(node, "expression", list.next.data as QueryExpression);
                if (match(node, expression)) {
                    add(node, expression.buffer);
                    return; // process on next rule
                } else {         
                    searcher = true; // goto start sendNodeNext and find expression
                }
            }
        }
        
    }
    
}

export default function match(node: Node, expr: QueryExpression) {
    if (expr.type === "decl") {
        return matchDecl(node as Declaration, expr);
    } else if (expr.type === "rule") {
        return  matchRule(node as Rule, expr);
    }
}

export function cmp(matcher: QueryProperty, prop: string): boolean {
    if (matcher instanceof Function) {
        return (matcher as StreamFunctor<string, boolean>)(prop);
    } else if (matcher instanceof RegExp) {
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
        if (item.value !== (void 0)) {
            if (!cmp(item.value, decl.value || "")) {
                continue;
            }
        }
        
        if (expr.next) {
            if (expr.next.type === "rule" && decl.parent) {
                if (!matchRule(decl.parent as Rule, expr.next)) {
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
    if (!expr) { return false; }
    const { value } = expr;
    if (!value) { return false; }
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