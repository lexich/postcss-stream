import { Container, Result, Node } from "postcss";
import { Query, Stream, LinkedNodes, QueryExpression, MNode, } from "./interface";
import appendNodeToBuffer from "./appendNodeToBuffer";
import processQuery from "./processQuery";
import match from "./match";
import mapper from "./types/mapper";

export default class Walker {
    private query: Query = { decl: [], rule: [] };
    private nextWalker?: Walker;    
    private prevWalker?: Walker;    
    private updateNodeList: LinkedNodes<Node>;
    
    constructor(private streams: Stream[], prevWalker?: Walker) {
        this.setPrevWalker(prevWalker);
        for (let stream of streams) {
            this.query = processQuery(stream, this.query);
        }
    }

    getPrevWalker() {
        return this.prevWalker;
    }

    setPrevWalker(prevWalker?: Walker) {
        this.prevWalker = prevWalker;
        if (prevWalker) {
            prevWalker.setNextWalker(this);
        }
    }

    setNextWalker(nextWalker: Walker) {
        this.nextWalker = nextWalker;
    }

    updateModel = (node: Node) => {
        this.updateNodeList = {
            next: this.updateNodeList,
            data: node
        };
    }

    public run(css: Container, result: Result) {
        css.walk(this.walk);
        this.execute();
    }

    public execute() {
        const queries = [this.query.decl, this.query.rule];
        let buffer: LinkedNodes<MNode>, 
            query: QueryExpression[],
            item: QueryExpression;
        for (query of queries) {
            for(item of query) {
                buffer = item.rootBuffer;
                while (buffer.data) {
                    const node = !this.nextWalker ? buffer.data : mapper(buffer.data, this.updateModel);
                    item.fn(node);
                    buffer = buffer.next;
                }
            }
        }
        if (this.nextWalker) {
            while (this.updateNodeList) {
                const node = this.updateNodeList.data as MNode;
                this.nextWalker.walk(node);
                this.updateNodeList = this.updateNodeList.next;
            }
            this.nextWalker.execute();
        }
    }

    public walk = (child: MNode)=> {
        const queries = 
            child.type === "decl" ? this.query.decl :
            child.type === "rule" ? this.query.rule : [];
        
        for (let query of queries) {
            if (match(child, query)) {
                appendNodeToBuffer(child, query);
            }
        }
        if (this.nextWalker) {
            this.nextWalker.walk(child);
        }
    }
}