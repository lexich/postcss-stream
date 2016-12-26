import { Declaration, Rule, Node } from "postcss";
import { QueryExpression, QDeclarationMatcher, QDeclaration, QRule, MNode } from "./interface";
import { expressionByType } from "./processQuery";
import { add, isEmpty } from "./linkedlist";

export function sendNodeNext(node: MNode): void {
    let searcher = true;
    while (searcher) {
        searcher = false;
        if (!node.__meta__) { 
            return;
        }
        const {expression} = node.__meta__;
        let {next} = expression;
        while (next) {
            if (match(node, next)) {
                node.__meta__.expression = next;
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
                return (node.__meta__ = (void 0));
            }
            let list = expressionByType(nextWalker.query, expression.type);
            if (isEmpty(list)) {
                // clean meta information
                (node.__meta__ = (void 0));
                searcherWalker = true;
                continue; // nextWalker
            } else {
                node.__meta__.expression = list.next.data as QueryExpression;
                if (match(node, node.__meta__.expression)) {
                    add(node, node.__meta__.expression.buffer);
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

export function cmp(matcher: QDeclarationMatcher, prop: string): boolean {
    if (matcher instanceof Function) {
        return matcher(prop);
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