import * as postcss from "postcss";
import fastIterator from "./iterator";
import compile from "./compile";
import { Query, VisitorContrainer, Visitor, RefNode} from "./interfaces"

export function traverse(css: postcss.Root, queries: Query[]) {
    let isDirty: boolean;
    const iter = { val: 1 };

    const visitors: VisitorContrainer = { enter: [], leave: [] };
    queries.forEach((query)=> {
        compile(query, iter, null, visitors);
    });

    const match = function(node: postcss.Node, visit: Visitor) {
        if (!visit.match(node)) { return false; }
        let vParent = visit.parent;
        let nParent = node.parent;
        while(vParent) {
            if (!vParent.match(nParent)) { return false; }
            vParent = vParent.parent;
            nParent = nParent.parent;
        }
        return true;
    };

    const iterate = function(node: postcss.Node, index: number, enter: boolean) {
        let ref = (enter ? (node as RefNode)._refEnter : (node as RefNode)._refLeave) || 0;
        const arr = enter ? visitors.enter : visitors.leave;
        for(let visit of arr) {
            if (ref >= visit.ref) {
                continue;
            } else {
                ref = visit.ref;
            }
            if (visit.type !== node.type) { continue; }
            if (match(node, visit)) {
                isDirty = true;
                visit.fn(node);
            }
        }
        if (enter) {
            (node as RefNode)._refEnter = ref;
        } else {
            (node as RefNode)._refLeave = ref;
        }
    };

    do {
        isDirty = false;
        fastIterator(css, iterate);
    } while(isDirty);
}
