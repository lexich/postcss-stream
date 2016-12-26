import { Container, Result } from "postcss";
import { Query, Stream, MNode } from "./interface";
export default class Walker {
    private streams;
    query: Query;
    private nextWalker?;
    private prevWalker?;
    constructor(streams: Stream[], prevWalker?: Walker);
    getPrevWalker(): Walker;
    setPrevWalker(prevWalker?: Walker): void;
    setNextWalker(nextWalker: Walker): void;
    getNextWalker(): Walker;
    run(css: Container, result: Result): void;
    execute(): void;
    walk: (child: MNode) => void;
}
