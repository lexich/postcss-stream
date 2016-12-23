import { Node } from "postcss";
import { MNode } from "./interface";
import CNode from "./node";
export default function (node: MNode, updateModel: ((n: Node) => void)): CNode;
