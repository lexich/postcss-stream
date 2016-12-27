"use strict";
var linkedlist_1 = require("./linkedlist");
function toArray(item) {
    if (!item) {
        return [];
    }
    else {
        return Array.isArray(item) ? item : [item];
    }
}
function processDecl(decl) {
    var result = [];
    if (Array.isArray(decl)) {
        for (var _i = 0, decl_1 = decl; _i < decl_1.length; _i++) {
            var item = decl_1[_i];
            result = result.concat(processDecl(item));
        }
    }
    else {
        var d = decl;
        var props = toArray(d.prop);
        var values = toArray(d.value);
        if (props.length && values.length) {
            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                var v = values_1[_a];
                for (var _b = 0, props_1 = props; _b < props_1.length; _b++) {
                    var p = props_1[_b];
                    result.push({
                        prop: p,
                        value: v
                    });
                }
            }
        }
        else if (props.length) {
            for (var _c = 0, props_2 = props; _c < props_2.length; _c++) {
                var p = props_2[_c];
                result.push({ prop: p });
            }
        }
        else {
            for (var _d = 0, values_2 = values; _d < values_2.length; _d++) {
                var v = values_2[_d];
                result.push({ value: v });
            }
        }
    }
    return result;
}
exports.processDecl = processDecl;
function processRule(rule) {
    var selector = rule.selector;
    if (typeof selector === "string" || selector instanceof String || selector instanceof RegExp || selector instanceof Function) {
        return [selector];
    }
    else if (Array.isArray(rule)) {
        return rule.reduce(function (memo, r) { return memo.concat(processRule(r)); }, []);
    }
    else {
        return [];
    }
}
exports.processRule = processRule;
function expressionByType(query, type) {
    return type === "decl" ? query.decl :
        type === "rule" ? query.rule : null;
}
exports.expressionByType = expressionByType;
function processStream(stream, walker) {
    if (stream.decl) {
        var decl = stream.decl;
        var declArray = Array.isArray(decl) ? decl : [decl];
        return declArray.map(function (d) { return ({
            fn: d.enter,
            walker: walker,
            type: "decl",
            value: processDecl(d),
            next: null,
            buffer: linkedlist_1.init()
        }); });
    }
    else if (stream.rule) {
        var rule = stream.rule;
        var ruleExp_1 = {
            fn: null,
            walker: walker,
            type: "rule",
            value: null,
            next: null,
            buffer: null
        };
        if (rule.decl) {
            var declExpr = processStream(rule, walker);
            if (declExpr.length) {
                ruleExp_1.fn = declExpr[0].fn;
                ruleExp_1.buffer = declExpr[0].buffer;
                return declExpr.map(function (decl) {
                    decl.next = ruleExp_1;
                    return decl;
                });
            }
            else {
                return [ruleExp_1];
            }
        }
        else {
            ruleExp_1.value = processRule(rule);
            return [ruleExp_1];
        }
    }
    else {
        return [];
    }
}
function processQuery(stream, streamQuery, walker) {
    processStream(stream, walker).forEach(function (expr) {
        var list = streamQuery[expr.type];
        if (list) {
            linkedlist_1.add(expr, list);
        }
    });
    return streamQuery;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1F1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb2Nlc3NRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0EsMkNBQXlDO0FBRXpDLGlCQUFvQixJQUFhO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0FBQ0wsQ0FBQztBQUVELHFCQUE0QixJQUErRDtJQUN2RixJQUFJLE1BQU0sR0FBb0IsRUFBRSxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQSxDQUFhLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO1lBQWhCLElBQUksSUFBSSxhQUFBO1lBQ1IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFNLENBQUMsR0FBSSxJQUFtQyxDQUFDO1FBQy9DLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxDQUFVLFVBQU0sRUFBTixpQkFBTSxFQUFO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