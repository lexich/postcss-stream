import {
    StreamDeclaration, QDeclaration, StreamRule, QRule, 
    Stream, Query, QueryExpression, MNode
} from "./interface";
import Walker from "./walker";
import { init, add } from "./linkedlist";

export function processDecl(decl: StreamDeclaration) : QDeclaration[] {
    if (typeof decl === "string" || decl instanceof String) {
        return [{ prop: decl as string }];
    } else if (Array.isArray(decl)) {
        let result : QDeclaration[] = [];
        for(let item of decl) {
            result = result.concat(processDecl(item));
        }
        return result;
    } else if (typeof decl === "object") {
        return [decl];
    } else {
        return [];
    }
}

export function processRule(rule: StreamRule) : QRule[] {
    if (typeof rule === "string" || rule instanceof String || rule instanceof RegExp) {
        return [rule];
    } else if(Array.isArray(rule))  {
        return rule.reduce(
            (memo, r) => memo.concat(processRule(r)), []);
    } else {
        return [];
    }
}

export function expressionByType(query: Query, type: string) {
    return type === "decl" ? query.decl :
           type === "rule" ? query.rule : null;
}

export default function processQuery(stream: Stream, streamQuery: Query, walker: Walker) : Query {
    const { query, fn } = stream;
    const expr: QueryExpression = { 
        fn, walker,
        type: null,
        value: null,
        next: null,
        buffer: init<MNode>()
    };
    if (query.decl) {
        expr.type = "decl";
        expr.value = processDecl(query.decl);
        add(expr, streamQuery.decl);
    }
    if (query.rule) {
        let ptr: QueryExpression = expr;
        if (expr.type) {
            ptr = { 
                fn, walker,
                type: "rule", 
                value: null, 
                next: null, 
                buffer: expr.buffer
            };
            expr.next = ptr;
        } else {
            expr.type = "rule";
            add(expr, streamQuery.rule);
        }
        ptr.value = processRule(query.rule);
    }
    return streamQuery;
}