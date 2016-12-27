import {
    QDeclaration, QRule, 
    Stream, Query, QueryExpression, MNode,
    QueryDeclaration, QueryDeclarationDefinition,
    QueryRule, QueryRuleDefinition,
    StringOrRegexpOrFunction,
    QueryProperty
} from "./interface";
import StreamPipe from "./walker";
import { init, add } from "./linkedlist";

function toArray<T>(item: T | T[]): T[] {
    if (!item) { 
        return []; 
    } else {
        return Array.isArray(item) ? item : [item];
    }
}

export function processDecl(decl: QueryDeclarationDefinition | QueryDeclarationDefinition[]) : QDeclaration[] {
    let result : QDeclaration[] = [];
    if (Array.isArray(decl)) {
        for(let item of decl) {
            result = result.concat(processDecl(item));
        }
    } else {
        const d = (decl as QueryDeclarationDefinition);
        const props = toArray(d.prop);
        const values = toArray(d.value);
        if (props.length && values.length) {
            for (let v of values) {
                for (let p of props) {
                    result.push({ 
                        prop: p as QueryProperty, 
                        value: v as QueryProperty 
                    });
                }
            }
        } else if (props.length) {
            for (let p of props) {
                result.push({ prop: p as QueryProperty });
            }
        } else {
            for (let v of values) {
                result.push({ value: v as QueryProperty });
            }
        }
        if (d.array && d.array.length > 0) {
            result = result.concat(d.array);
        }
    }
    return result;
}

export function processRule(rule: QueryRuleDefinition) : QRule[] {
    const {selector} = rule;
    if (typeof selector === "string" || selector instanceof String || selector instanceof RegExp || selector instanceof Function) {
        return [selector as StringOrRegexpOrFunction];
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

function processStream(stream: Stream, walker: StreamPipe): QueryExpression[] {
    if ((stream as QueryDeclaration).decl) {
        const {decl} = (stream as QueryDeclaration);
        const declArray = Array.isArray(decl) ? decl : [decl];
        return declArray.map((d)=> ({ 
            fn: d.enter, 
            walker,
            type: "decl",
            value: processDecl(d),
            next: null,
            buffer: init<MNode>()
        }));
        
    } else if ((stream as QueryRule).rule) {
        const {rule} = (stream as QueryRule);
        const ruleExp: QueryExpression = {
            fn: null,
            walker,
            type: "rule",
            value: processRule(rule as QueryRuleDefinition),
            next: null,
            buffer: null
        };
        if ((rule as QueryDeclaration).decl) {            
            const declExpr = processStream(rule as Stream, walker);
            if (declExpr.length) {
                ruleExp.fn = declExpr[0].fn;
                ruleExp.buffer = declExpr[0].buffer;
                return declExpr.map((decl)=> {
                    decl.next = ruleExp;
                    return decl;
                });
            }            
        }
        return [ruleExp];
    } else {
        return [];
    }
}

export default function processQuery(stream: Stream, streamQuery: Query, walker: StreamPipe) : Query {
    processStream(stream, walker).forEach((expr)=> {
        const list = (streamQuery as any)[expr.type];
        if (list) {
            add<QueryExpression>(expr, list);
        }
    });
    return streamQuery;
}