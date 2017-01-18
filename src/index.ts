import * as postcss from "postcss";
import {traverse} from "./traverse";
import {Query} from "./interfaces";

export default postcss.plugin('postcss-stream', function(queries: Query[]) {
    return function(css: postcss.Root, result: postcss.Result) {
        return traverse(css, queries);
    };
});
