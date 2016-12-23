import {Node, Declaration} from "postcss";
import {MNode} from "../interface";

export default function (node: MNode, updateModel: ((n: Node)=> void)): MNode {
    if (node.type === "decl") {
        if (!node.__meta__.patch) {
            node.__meta__.patch = true;
            (node as any).__value = (node as Declaration).value;
            Object.defineProperty(node, "value", {
                get() {
                    return this.__value;
                },
                set(value) {
                    updateModel(this);
                    this.__value = value;
                },
                enumerable: true,
                configurable: true
            });
            
        } 
    } 
    return node;
}