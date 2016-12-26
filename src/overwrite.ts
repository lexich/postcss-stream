import { MNode } from "./interface";
import { sendNodeNext } from "./match";

function overwriteProps(node: any, name: string) {
    const innerName = "__" + name + "__";
    if (node[innerName]) { 
        return;
    }
    node[innerName] = node[name];
    delete node[name];
    Object.defineProperty(node, name, {
        get() {            
            return node[innerName];
        },
        set(value) {
            this[innerName] = value;
            sendNodeNext(this as MNode);
        }
    });
}

export default function(child: MNode): MNode {
    if (child.type === "decl") {
        overwriteProps(child, "value");
    }
    return child;
}