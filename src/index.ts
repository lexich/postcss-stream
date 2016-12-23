import * as postcss from "postcss";
import Walker from "./Walker";
import { Stream } from "./interface";


export interface Options {
    streams: Stream[];
    
}
export default postcss.plugin('postcss-stream', function(opts?: Options) {
    const walker = new Walker(
        opts ? opts.streams : []
    );
    return function (css, result) {
        walker.run(css, result);
    };
});
