import { Container, Result } from "postcss";
import { Query, Stream, QueryExpression, MNode, } from "./interface";
import processQuery, { expressionByType } from "./processQuery";
import match from "./match";
import {init, add, NONE, LinkedItemList, isEmpty, shift} from "./linkedlist";
import overwrite from "./overwrite";

export default class Walker {
    public query: Query = { 
        decl: init<QueryExpression>(), 
        rule: init<QueryExpression>() 
    };
    private nextWalker?: Walker;    
    private prevWalker?: Walker;    
    
    constructor(private streams: Stream[], prevWalker?: Walker) {
        this.setPrevWalker(prevWalker);
        for (let stream of streams) {
            this.query = processQuery(stream, this.query, this);
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

    getNextWalker() {
        return this.nextWalker;
    }

    run(css: Container, result: Result) {
        css.walk(this.walk);
        this.execute();
    }

    execute() {
        let item: QueryExpression;
        let list: LinkedItemList<QueryExpression>;
        let iter: LinkedItemList<QueryExpression>;
        ["decl", "rule"].forEach((type)=> {
            list = expressionByType(this.query, type);
            if (!list) { return;}
            iter = list.next;
            while (iter.data !== NONE) {
                item = iter.data as QueryExpression;
                while (!isEmpty(item.buffer)) {
                    const node = shift(item.buffer);
                    item.fn(overwrite(node));
                }
                iter = iter.next;
            }   
        });
        if (this.nextWalker) {
            this.nextWalker.execute();
        }
    }

    walk = (child: MNode)=> {
        const queries: LinkedItemList<QueryExpression> = expressionByType(this.query, child.type);
        if (!queries) { return; }        
        let iter = queries.next;        
        let query: QueryExpression;
        while (iter.data !== NONE) {            
            query = iter.data as QueryExpression;
            if (match(child, query)) {
                add(child, query.buffer);
                if (!child.__meta__) {
                    child.__meta__ = { expression: query };
                }
                // first rule catch element
                return;
            }
            iter = iter.next;
        }
        if (this.nextWalker) {
            this.nextWalker.walk(child);
        }
    }
}