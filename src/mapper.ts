import {Node} from "postcss";
import {MNode} from "./interface";
import CDeclaration from "./declaration";
import CNode from "./node";

export default function (node: MNode, updateModel: ((n: Node)=> void)): CNode {
    if (node.type === "decl") {
        return new CDeclaration(updateModel, node);
    } else {
        return new CNode(updateModel, node);
    }
}