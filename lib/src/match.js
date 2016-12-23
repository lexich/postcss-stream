"use strict";
function match(node, expr) {
    if (expr.type === "decl") {
        return this.matchDecl(node, expr);
    }
    else if (expr.type === "rule") {
        return this.matchRule(node, expr);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = match;
function cmp(matcher, prop) {
    if (matcher instanceof RegExp) {
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
        if (item.value !== undefined && !cmp(item.value, decl.value)) {
            continue;
        }
        if (expr.next) {
            if (expr.next.type === "rule" && decl.parent) {
                if (!this.matchRule(decl.parent, expr.next)) {
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
//# sourceMappingURL=match.js.map