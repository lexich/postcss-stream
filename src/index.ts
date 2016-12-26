import * as postcss from "postcss";
import StreamPipe from "./walker";
import { Stream } from "./interface";

export interface Options {
    streams: Stream[];
}

export function createStream(opts?: Options): StreamPipe {
    return new StreamPipe( opts ? opts.streams : []);
}

export default postcss.plugin('postcss-stream', function(walkers: StreamPipe[]) {
    walkers.concat().reduce((prev: StreamPipe, current: StreamPipe)=> {
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