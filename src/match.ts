import * as postcss from "postcss";
import { Visitor } from "./interfaces";

export default function match(node: postcss.Node, visit: Visitor) {
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
