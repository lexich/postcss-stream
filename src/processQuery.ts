import {
    StreamDeclaration, QDeclaration, StreamRule, QRule, 
    Stream, Query, LinkedNodes, QueryExpression, MNode
} from "./interface";

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

export default function processQuery(stream: Stream, streamQuery: Query) : Query {
    const { query, fn } = stream;
    const buffer: LinkedNodes<MNode> = { data: null, next: null };
    const expr: QueryExpression = 
        { type: null, value: null, next: null, fn: fn, 
            tailBuffer: buffer, rootBuffer: buffer };
    if (query.decl) {
        expr.type = "decl";
        expr.value = processDecl(query.decl);
        streamQuery.decl.push(expr);
    }
    if (query.rule) {
        let ptr: QueryExpression = expr;
        if (ptr.type) {
            ptr = { type: "rule", value: null, next: null, fn: fn, rootBuffer: expr.rootBuffer };
            expr.next = ptr;
        } else {
            ptr.type = "rule";
        }
        ptr.value = processRule(query.rule);
    }
    return streamQuery;
}