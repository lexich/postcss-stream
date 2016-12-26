import * as postcss from "postcss";
import Walker from "./walker";
import { Stream } from "./interface";

export interface Options {
    streams: Stream[];
}

export function createWalker(opts?: Options): Walker {
    return new Walker( opts ? opts.streams : []);
}

export default postcss.plugin('postcss-stream', function(walkers: Walker[]) {
    walkers.concat().reduce((prev: Walker, current: Walker)=> {
        prev.setNextWalker(current);
        return current;
    });
    const walker = walkers[0];
    return function(css: postcss.Root, result: postcss.Result) {
        if (walker) {
            walker.run(css, result);
        }
    };
});