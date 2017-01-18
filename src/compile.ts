import compileMatcher from "./compileMatcher";
import {Query, Visitor, VisitorContrainer} from "./interfaces";

const ATTRS = ['decl', 'rule', 'atrule', 'comment', 'root'];
export default function compile(query: Query, iter: {val: number}, parent: Visitor, container: VisitorContrainer): VisitorContrainer | null {
    if (!query) { return null; }
    let anyQuery: any;
    if (!container) {
        container = { enter:[], leave: [] };
    }
    for (let type of ATTRS) {
        anyQuery = (query as any)[type];
        if (anyQuery) {
            const match = compileMatcher(query, type);
            const visitEnter = {
                type, match, parent,
                ref: iter.val,
                fn: anyQuery.enter,
            };
            iter.val += 1;
            if (visitEnter.fn) {
                container.enter[container.enter.length] = visitEnter;
            }
            compile(anyQuery, iter, visitEnter, container);
            if (anyQuery.leave) {
                container.leave[container.leave.length] =  {
                    type, match, parent,
                    ref: iter.val,
                    fn: anyQuery.leave,
                };
            }
            iter.val += 1;
        }
    }
    return container;
}
