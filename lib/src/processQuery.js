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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1F1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb2Nlc3NRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsMkNBQXlDO0FBRXpDLHFCQUE0QixJQUF1QjtJQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBYyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUFvQixFQUFFLENBQUM7UUFDakMsR0FBRyxDQUFBLENBQWEsVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7WUFBaEIsSUFBSSxJQUFJLGFBQUE7WUFDUixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0FBQ0wsQ0FBQztBQWRELGtDQWNDO0FBRUQscUJBQTRCLElBQWdCO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksTUFBTSxJQUFJLElBQUksWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ2QsVUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUM7QUFURCxrQ0FTQztBQUVELDBCQUFpQyxLQUFZLEVBQUUsSUFBWTtJQUN2RCxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSTtRQUM1QixJQUFJLEtBQUssTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQy9DLENBQUM7QUFIRCw0Q0FHQztBQUVELHNCQUFxQyxNQUFjLEVBQUUsV0FBa0IsRUFBRSxNQUFjO0lBQzNFLElBQUEsb0JBQUssRUFBRSxjQUFFLENBQVk7SUFDN0IsSUFBTSxJQUFJLEdBQW9CO1FBQzFCLEVBQUUsSUFBQSxFQUFFLE1BQU0sUUFBQTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxpQkFBSSxFQUFTO0tBQ3hCLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxnQkFBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsR0FBRztnQkFDRixFQUFFLElBQUEsRUFBRSxNQUFNLFFBQUE7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNuQixnQkFBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUN2QixDQUFDOztBQWhDRCwrQkFnQ0MifQ==