import { Node } from "postcss";
export default class CNode {
    updateModel: ((n: Node) => void);
    node: Node;
    constructor(updateModel: ((n: Node) => void), node?: Node);
}
