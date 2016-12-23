"use strict";
function default_1(node, expr) {
    if (expr.tailBuffer === expr.rootBuffer) {
        expr.rootBuffer.next = { data: null, next: null };
        expr.rootBuffer.data = node;
        expr.tailBuffer = expr.rootBuffer.next;
    }
    else {
        expr.tailBuffer.data = node;
        expr.tailBuffer.next = { data: null, next: null };
    }
    if (!node.__meta__) {
        node.__meta__ = { expressions: [] };
    }
    if (node.__meta__.expressions.indexOf(expr) === -1) {
        node.__meta__.expressions.push(expr);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=appendNodeToBuffer.js.map