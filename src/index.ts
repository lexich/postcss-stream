import * as postcss from "postcss";
import {Query, traverse} from "./traverse";

export default postcss.plugin('postcss-stream', function(queries: Query[]) {
    return function(css: postcss.Root, result: postcss.Result) {
        return traverse(css, queries);
    };
});
