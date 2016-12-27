"use strict";
var processQuery_1 = require("./processQuery");
var linkedlist_1 = require("./linkedlist");
var meta_1 = require("./meta");
function sendNodeNext(node) {
    var searcher = true;
    while (searcher) {
        searcher = false;
        var expression = meta_1.getMeta(node, "expression");
        if (!expression) {
            return;
        }
        var next = expression.next;
        while (next) {
            if (match(node, next)) {
                meta_1.setMeta(node, "expression", next);
                return;
            }
            next = next.next;
        }
        var nextWalker = expression.walker.getNextWalker();
        var searcherWalker = true;
        while (searcherWalker) {
            searcherWalker = false;
            if (!nextWalker) {
                return meta_1.clearMeta(node);
            }
            var list = processQuery_1.expressionByType(nextWalker.query, expression.type);
            if (linkedlist_1.isEmpty(list)) {
                meta_1.clearMeta(node);
                searcherWalker = true;
                continue;
            }
            else {
                ;
                var expression_1 = meta_1.setMeta(node, "expression", list.next.data);
                if (match(node, expression_1)) {
                    linkedlist_1.add(node, expression_1.buffer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtDQUFrRDtBQUNsRCwyQ0FBNEM7QUFDNUMsK0JBQXFEO0FBRXJELHNCQUE2QixJQUFXO0lBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixPQUFPLFFBQVEsRUFBRSxDQUFDO1FBQ2QsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFNLFVBQVUsR0FBRyxjQUFPLENBQWtCLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQ3ZCLElBQUEsc0JBQUksQ0FBZTtRQUN4QixPQUFPLElBQUksRUFBRSxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLGNBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sY0FBYyxFQUFFLENBQUM7WUFDcEIsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRWQsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksSUFBSSxHQUFHLCtCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFB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