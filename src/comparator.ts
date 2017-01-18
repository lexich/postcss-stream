import * as postcss from "postcss";
import {MatcherType, MatcherFunctor} from "./interfaces";

export default function comparator(cmp: MatcherType, prop: string, node: postcss.Node): boolean {
    if (cmp === null || cmp === undefined) {
        return true;
    } else if (typeof cmp === "string" || cmp instanceof String) {
        return cmp === prop;
    } else if (cmp instanceof RegExp) {
        return cmp.test(prop);
    } else if (cmp instanceof Function) {
        return (cmp as MatcherFunctor)(node);
    } else if (Array.isArray(cmp)) {
        for (let state of cmp) {
            if (comparator(state, prop, node)) {
                return true;
            }
        }
        return false;
    } else {
        // TODO add object quick expressions
        return false;
    }
}
