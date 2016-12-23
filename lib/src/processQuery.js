"use strict";
function processDecl(decl) {
    if (typeof decl === "string" || decl instanceof String) {
        return [{ prop: decl }];
    }
    else if (Array.isArray(decl)) {
        var result = [];
        for (var _i = 0, decl_1 = decl; _i < decl_1.length; _i++) {
            var item = decl_1[_i];
            result = result.concat(processDecl(item));
        }
        return result;
    }
    else if (typeof decl === "object") {
        return [decl];
    }
    else {
        return [];
    }
}
exports.processDecl = processDecl;
function processRule(rule) {
    if (typeof rule === "string" || rule instanceof String || rule instanceof RegExp) {
        return [rule];
    }
    else if (Array.isArray(rule)) {
        return rule.reduce(function (memo, r) { return memo.concat(processRule(r)); }, []);
    }
    else {
        return [];
    }
}
exports.processRule = processRule;
function processQuery(stream, streamQuery) {
    var query = stream.query, fn = stream.fn;
    var buffer = { data: null, next: null };
    var expr = { type: null, value: null, next: null, fn: fn,
        tailBuffer: buffer, rootBuffer: buffer };
    if (query.decl) {
        expr.type = "decl";
        expr.value = processDecl(query.decl);
        streamQuery.decl.push(expr);
    }
    if (query.rule) {
        var ptr = expr;
        if (ptr.type) {
            ptr = { type: "rule", value: null, next: null, fn: fn, rootBuffer: expr.rootBuffer };
            expr.next = ptr;
        }
        else {
            ptr.type = "rule";
        }
        ptr.value = processRule(query.rule);
    }
    return streamQuery;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processQuery;
//# sourceMappingURL=processQuery.js.map