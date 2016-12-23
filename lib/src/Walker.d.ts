import { Container, Result, Node } from "postcss";
import { Stream, MNode } from "./interface";
export default class Walker {
    private streams;
    private query;
    private nextWalker?;
    private updateNodeList;
    constructor(streams: Stream[], nextWalker?: Walker);
    updateModel: (node: Node) => void;
    run(css: Container, result: Result): void;
    execute(): void;
    walk: (child: MNode) => void;
}
