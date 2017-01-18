import * as postcss from "postcss";
import comparator from "./comparator";
import {QueryDeclaration,MatcherFunctor,QueryRule, QueryAtRule, QueryComment, QueryRoot, Query} from "./interfaces";

function trueMatcher(node: postcss.Node): boolean {
    return true;
}

const MATCHER = {
    decl({decl}: QueryDeclaration): MatcherFunctor {
        if (!decl) { return trueMatcher; }
        return function(node: postcss.Declaration): boolean {
            if (!node || node.type !== "decl") { return false; }
            if (this.important !== undefined && this.important !== node.important) {
                return false;
            }
            if (this.prop !== undefined && !comparator(this.prop, node.prop, node)) {
                return false;
            }
            if (this.value !== undefined && !comparator(this.value, node.value, node)) {
                return false;
            }
            return true;
        }.bind(decl);
    },
    rule({rule}: QueryRule): MatcherFunctor {
        if (!rule) { return trueMatcher; }
        return function(node: postcss.Rule): boolean {
            if (!node || node.type !== "rule") { return false; }
            if (this.selector !== undefined) {
                let isMatch = false;
                for(let item of node.selectors) {
                    if (comparator(this.selector, item, node)) {
                        isMatch = true;
                        break;
                    }
                }
                if (!isMatch) { return false;}
            }
            return true;
        }.bind(rule);
    },
    atrule({atrule}: QueryAtRule): MatcherFunctor {
        if (!atrule) { return trueMatcher; }
        return function(node: postcss.AtRule): boolean {
            if (!node || node.type !== "atrule") { return false; }
            if (this.name !== undefined && !comparator(this.name, node.name, node)) {
                return false;
            }
            if (this.params !== undefined && !comparator(this.params, node.params, node)) {
                return false;
            }
            return true;
        }.bind(atrule);
    },
    comment({comment}: QueryComment): MatcherFunctor {
        if (!comment) { return trueMatcher; }
        return function(node: postcss.Comment): boolean {
            if (!node || node.type !== "comment") { return false; }
            if (this.text !== undefined && !comparator(this.text, node.text, node)) {
                return false;
            }
            return true;
        }.bind(comment);
    },
    root(query: QueryRoot): MatcherFunctor {
        return trueMatcher;
    }
};

export default function compileMatcher(query: Query, type: string): MatcherFunctor {
    const matcher = (MATCHER as any)[type];
    if (matcher) {
        return matcher(query);
    } else {
        return trueMatcher;
    }
}
