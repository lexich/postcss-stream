import { Container, Result } from "postcss";
import { Query, Stream, QueryExpression, MNode, } from "./interface";
import processQuery from "./processQuery";
import expressionByType from "./expressionByType";
import match from "./match";
import {init, add, NONE, LinkedItemList, isEmpty, shift} from "./linkedlist";
import overwrite from "./overwrite";
import metaService from "./meta";

export default class StreamPipe {
    public query: Query = { 
        decl: init<QueryExpression>(), 
        rule: init<QueryExpression>() 
    };
    
    private nextWalker?: StreamPipe;    
    private prevWalker?: StreamPipe;
    private scope: any;
    
    constructor(private streams: Stream[], prevWalker?: StreamPipe) {
        this.setPrevWalker(prevWalker);
        for (let stream of streams) {
            processQuery(expr => {
                expr.walker = this;
                const list = expressionByType(this.query, expr.type);
                if (list) {
                    add(expr, list);
                }
                
            }, stream);
        }
        const scope: any = { default: {} };
        this.scope = {
            get(name: string, scopeName = "default") {
                return scope[scopeName] && scope[scopeName][name];
            },
            set(name: string, value: any, scopeName = "default") {
                const ptr = scope[scopeName] || (scope[scopeName] = {});
                ptr[name] = value;
            },
            all(scopeName = "default") {
                return scope[scopeName];
            }
        };
    }

    getPrevWalker() {
        return this.prevWalker;
    }

    setPrevWalker(prevWalker?: StreamPipe) {
        this.prevWalker = prevWalker;
        if (prevWalker) {
            prevWalker.setNextWalker(this);
        }
    }

    setNextWalker(nextWalker: StreamPipe) {
        this.nextWalker = nextWalker;
    }

    getNextWalker() {
        return this.nextWalker;
    }

    run(css: Container, result: Result) {
        this.each(css);
        this.runNodesBuffer();
    }
    
    private queueSkipNodes = init<MNode>();

    skipNode(node: MNode) {
        metaService.get(node).skip = true;
        add(node, this.queueSkipNodes);
    }

    runNodesBuffer() {
        while(!isEmpty(this.queueSkipNodes)) {
            const node = shift(this.queueSkipNodes);
            metaService.get(node).skip = false;            
            this.walk(node, "enter");
            if (((node as any) as Container).each) {
                this.each(((node as any) as Container));
            }
            this.walk(node, "leave");
        }
        if (this.nextWalker) {
            this.nextWalker.runNodesBuffer();
        }
    }
    each(css: Container) {
        css.each((child, i)=> {
            this.walk(child as MNode, "enter");
            if ((child as Container).each) {
                this.each((child as Container));
            }
            this.walk(child as MNode, "leave");
        });
    }
    
    walk = (child: MNode, type: "enter" | "leave")=> {
        // node add to walker queue

        const meta = metaService.get(child);
        if (meta.skip) {
            return;
        }
        const queries: LinkedItemList<QueryExpression> = expressionByType(this.query, child.type);
        if (!queries) { return; }        
        let iter = queries.next;
        let query: QueryExpression;
        while (iter.data !== NONE) {            
            query = iter.data as QueryExpression;
            if (meta.expression === query) {
                if (meta.stage === "enter" && type === "enter") {
                    iter = iter.next;
                    continue;
                } else if (meta.stage === "leave") {
                    iter = iter.next;
                    continue;
                }
            }

            const fn = (type === "enter") ? query.enter :
                       (type === "leave") ? query.leave : null;
            if (fn && match(child, query)) {
                meta.expression = query;
                meta.stage = type;
                const node = overwrite(child, this) as MNode;
                fn.call(this.scope as any, node); // TODO: fix
                if (meta.skip) {
                    return;
                }
            }
            iter = iter.next;
        }
        if (this.nextWalker) {
            this.nextWalker.walk(child, type);
        }
    }
}