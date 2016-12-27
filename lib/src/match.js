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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtDQUFrRDtBQUNsRCwyQ0FBNEM7QUFDNUMsK0JBQXFEO0FBRXJELHNCQUE2QixJQUFXO0lBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixPQUFPLFFBQVEsRUFBRSxDQUFDO1FBQ2QsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFNLFVBQVUsR0FBRyxjQUFPLENBQWtCLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQ3ZCLElBQUEsc0JBQUksQ0FBZTtRQUN4QixPQUFPLElBQUksRUFBRSxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLGNBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sY0FBYyxFQUFFLENBQUM7WUFDcEIsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRWQsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksSUFBSSxHQUFHLCtCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELEVBQUUsQ0FBQyxDQUFDLG9CQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixnQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixRQUFRLENBQUM7WUFDYixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osQ0FBQztnQkFDRCxJQUFNLFlBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQXVCLENBQUMsQ0FBQztnQkFDbEYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLGdCQUFHLENBQUMsSUFBSSxFQUFFLFlBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDcEIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBRUwsQ0FBQztBQUVMLENBQUM7QUExQ0Qsb0NBMENDO0FBRUQsZUFBOEIsSUFBVSxFQUFFLElBQXFCO0lBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFFLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztBQUNMLENBQUM7O0FBTkQsd0JBTUM7QUFFRCxhQUFvQixPQUE0QixFQUFFLElBQVk7SUFDMUQsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBWkQsa0JBWUM7QUFFRCxtQkFBMEIsSUFBaUIsRUFBRSxJQUFxQjtJQUM5RCxHQUFHLENBQUMsQ0FBYSxVQUE0QixFQUE1QixLQUFBLElBQUksQ0FBQyxLQUF1QixFQUE1QixjQUE0QixFQUE1QixJQUE0QjtRQUF4QyxJQUFJLElBQUksU0FBQTtRQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixRQUFRLENBQUM7UUFDYixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQztZQUNiLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsUUFBUSxDQUFDO2dCQUNiLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osUUFBUSxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUF2QkQsOEJBdUJDO0FBRUQsbUJBQTBCLElBQVUsRUFBRSxJQUFxQjtJQUN2RCxHQUFHLENBQUMsQ0FBYSxVQUFxQixFQUFyQixLQUFBLElBQUksQ0FBQyxLQUFnQixFQUFyQixjQUFxQixFQUFyQixJQUFxQjtRQUFqQyxJQUFJLElBQUksU0FBQTtRQUVULEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFnQixVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSTtnQkFBbkIsSUFBSSxPQUFPLGFBQUE7Z0JBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0o7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7S0FDSjtJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCw4QkFnQkMifQ==