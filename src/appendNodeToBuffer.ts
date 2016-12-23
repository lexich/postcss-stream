import {QueryExpression, MNode} from "./interface";

 
 export default function(node: MNode, expr: QueryExpression) {
    if (expr.tailBuffer === expr.rootBuffer) {
        expr.rootBuffer.next = { data: null, next: null };
        expr.rootBuffer.data = node;
        expr.tailBuffer = expr.rootBuffer.next;
    } else {
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