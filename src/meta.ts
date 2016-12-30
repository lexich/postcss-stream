import { MNode, QueryExpression } from "./interface";
import { Container } from "postcss";
import StreamPipe from "./streampipe";

export interface MetaObject {
    self: MNode;
    proxy?: MNode;
    pipe?: StreamPipe;
    skip: boolean;
    expression?: QueryExpression;
    stage: "enter" | "leave" | null;
    fnIndex?: (proxy: MNode | number) => number | MNode;
}


export class Meta {
    private map: {
        [key:string]: MetaObject
    } = {};
    private idNode = 0;

    clone(node: MNode, original: MNode): MNode {
        node.id = undefined;
        const oMeta = this.get(original);
        const meta = this.get(node);
        meta.pipe = oMeta.pipe;
        meta.expression = oMeta.expression;
        meta.stage = oMeta.stage;
        if ((node as any).nodes) {
            const { nodes } = ((original as any) as Container);
            ((node as any).nodes as MNode[]).forEach((n, i)=> {
                this.clone(n, nodes[i] as MNode);
            });
        }
        return node;
    }

    get(node: MNode) : MetaObject {
        if (!node) { return; }
        let { id } = node;
        if (!id) { 
            id = node.id = this.idNode++;
        }
        return this.map[id] || (this.map[id] = {
            self: node,
            proxy: null,
            pipe: null,
            skip: false,
            expression: null,
            stage: null,
            fnIndex: null
        });
    }
}

export default new Meta();