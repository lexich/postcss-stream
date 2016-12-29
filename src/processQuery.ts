import {
    QDeclaration, QRule, 
    Stream, QueryExpression,
    QueryDeclaration, QueryDeclarationDefinition,
    QueryRule, QueryRuleDefinition,
    StringOrRegexpOrFunction,
    QueryProperty
} from "./interface";

function toArray<T>(item: T | T[]): T[] {
    if (!item) { 
        return []; 
    } else {
        return Array.isArray(item) ? item : [item];
    }
}

function processDecl(decl: QueryDeclarationDefinition | QueryDeclarationDefinition[]) : QDeclaration[] {
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

function processRule(rule: QueryRuleDefinition) : QRule[] {
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

function processStreamDecl(
    fn: (expr: QueryExpression) => void, 
    decl: QueryDeclarationDefinition | QueryDeclarationDefinition[]
) {
    const declArray = Array.isArray(decl) ? decl : [decl];
    declArray.forEach((d)=> { 
        const expr: QueryExpression = {
            enter: d.enter, 
            leave: d.leave,
            walker: null,
            type: "decl",
            value: processDecl(d),
            next: null,
        };
        if (!expr.value.length) {
            const value: QDeclaration = { prop: "*" };
            expr.value = [value];
        }
        fn(expr);
    });
}

function processStreamRule(
    fn: (expr: QueryExpression) => void, 
    rule: QueryRuleDefinition & QueryDeclaration
) {
    const ruleExp: QueryExpression = {
        enter: rule.enter,
        leave: rule.leave,
        walker: null,
        type: "rule",
        value: processRule(rule as QueryRuleDefinition),
        next: null
    };
    if ((rule as QueryDeclaration).decl) {            
        processQuery(expr => {
            expr.next = ruleExp;
            fn(expr);
        }, rule as Stream);
    }
    fn(ruleExp);
}

export default function processQuery(fn: (expr: QueryExpression) => void, stream: Stream): void {
    if ((stream as QueryDeclaration).decl) {
        processStreamDecl(fn, (stream as QueryDeclaration).decl);        
    } else if ((stream as QueryRule).rule) {
        processStreamRule(fn, (stream as QueryRule).rule);
    }
}