"use strict";
var processQuery_1 = require("./processQuery");
var linkedlist_1 = require("./linkedlist");
function sendNodeNext(node) {
    var searcher = true;
    while (searcher) {
        searcher = false;
        if (!node.__meta__) {
            return;
        }
        var expression = node.__meta__.expression;
        var next = expression.next;
        while (next) {
            if (match(node, next)) {
                node.__meta__.expression = next;
                return;
            }
            next = next.next;
        }
        var nextWalker = expression.walker.getNextWalker();
        var searcherWalker = true;
        while (searcherWalker) {
            searcherWalker = false;
            if (!nextWalker) {
                return (node.__meta__ = (void 0));
            }
            var list = processQuery_1.expressionByType(nextWalker.query, expression.type);
            if (linkedlist_1.isEmpty(list)) {
                (node.__meta__ = (void 0));
                searcherWalker = true;
                continue;
            }
            else {
                node.__meta__.expression = list.next.data;
                if (match(node, node.__meta__.expression)) {
                    linkedlist_1.add(node, node.__meta__.expression.buffer);
                    return;
                }
                else {
                    searcher = true;
                }
            }
        }
    }
}
exports.sendNodeNext = sendNodeNext;
function match(node, expr) {
    if (expr.type === "decl") {
        return matchDecl(node, expr);
    }
    else if (expr.type === "rule") {
        return matchRule(node, expr);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = match;
function cmp(matcher, prop) {
    if (matcher instanceof Function) {
        return matcher(prop);
    }
    else if (matcher instanceof RegExp) {
        return matcher.test(prop);
    }
    else {
        if (matcher === "*") {
            return true;
        }
        else {
            return matcher === prop;
        }
    }
}
exports.cmp = cmp;
function matchDecl(decl, expr) {
    for (var _i = 0, _a = expr.value; _i < _a.length; _i++) {
        var item = _a[_i];
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
                if (!matchRule(decl.parent, expr.next)) {
                    continue;
                }
            }
            else {
                continue;
            }
        }
        return true;
    }
    return false;
}
exports.matchDecl = matchDecl;
function matchRule(rule, expr) {
    for (var _i = 0, _a = expr.value; _i < _a.length; _i++) {
        var item = _a[_i];
        if (Array.isArray(item)) {
            for (var _b = 0, item_1 = item; _b < item_1.length; _b++) {
                var subitem = item_1[_b];
                if (cmp(subitem, rule.selector)) {
                    return true;
                }
            }
        }
        else {
            if (cmp(item, rule.selector)) {
                return true;
            }
        }
    }
    return false;
}
exports.matchRule = matchRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtDQUFrRDtBQUNsRCwyQ0FBNEM7QUFFNUMsc0JBQTZCLElBQVc7SUFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLE9BQU8sUUFBUSxFQUFFLENBQUM7UUFDZCxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNNLElBQUEscUNBQVUsQ0FBa0I7UUFDOUIsSUFBQSxzQkFBSSxDQUFlO1FBQ3hCLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sY0FBYyxFQUFFLENBQUM7WUFDcEIsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRWQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxJQUFJLEdBQUcsK0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxD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