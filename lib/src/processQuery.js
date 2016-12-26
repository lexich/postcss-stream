"use strict";
var linkedlist_1 = require("./linkedlist");
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
function expressionByType(query, type) {
    return type === "decl" ? query.decl :
        type === "rule" ? query.rule : null;
}
exports.expressionByType = expressionByType;
function processQuery(stream, streamQuery, walker) {
    var query = stream.query, fn = stream.fn;
    var expr = {
        fn: fn, walker: walker,
        type: null,
        value: null,
        next: null,
        buffer: linkedlist_1.init()
    };
    if (query.decl) {
        expr.type = "decl";
        expr.value = processDecl(query.decl);
        linkedlist_1.add(expr, streamQuery.decl);
    }
    if (query.rule) {
        var ptr = expr;
        if (expr.type) {
            ptr = {
                fn: fn, walker: walker,
                type: "rule",
                value: null,
                next: null,
                buffer: expr.buffer
            };
            expr.next = ptr;
        }
        else {
            expr.type = "rule";
            linkedlist_1.add(expr, streamQuery.rule);
        }
        ptr.value = processRule(query.rule);
    }
    return streamQuery;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1F1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb2Nlc3NRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsMkNBQXlDO0FBRXpDLHFCQUE0QixJQUF1QjtJQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBYyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUFvQixFQUFFLENBQUM7UUFDakMsR0FBRyxDQUFBLENBQWEsVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7WUFBaEIsSUFBSSxJQUFJLGFBQUE7WUFDUixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0FBQ0wsQ0FBQztBQWRELGtDQWNDO0FBRUQscUJBQTRCLElBQWdCO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksTUFBTSxJQUFJLElBQUksWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ2QsVUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUM7QUFURCxrQ0FTQztBQUVELDBCQUFpQyxLQUFZLEVBQUUsSUFBWTtJQUN2RCxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSTtRQUM1QixJQUFJLEtBQUssTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQy9DLENBQUM7QUFIRCw0Q0FHQztBQUVELHNCQUFxQyxNQUFjLEVBQUUsV0FBa0IsRUFBRSxNQUFrQjtJQUMvRSxJQUFBLG9CQUFLLEVBQUUsY0FBRSxDQUFZO0lBQzdCLElBQU0sSUFBSSxHQUFvQjtRQUMxQixFQUFFLElBQUEsRUFBRSxNQUFNLFFBQUE7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsaUJBQUksRUFBUztLQUN4QixDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsZ0JBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNiLElBQUksR0FBRyxHQUFvQixJQUFJLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixHQUFHLEdBQUc7Z0JBQ0YsRUFBRSxJQUFBLEVBQUUsTUFBTSxRQUFBO2dCQUNWLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxJQUFJO2dCQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkIsZ0JBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxHQUFHLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdkIsQ0FBQzs7QUFoQ0QsK0JBZ0NDIn0=