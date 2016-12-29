import * as postcss from "postcss";
import StreamPipe from "./streampipe";
import { Stream } from "./interface";

export function createStream(opts: Stream | Stream[]): StreamPipe {
    const rules: Stream[] = !opts ? [] : Array.isArray(opts) ? opts : [opts];
    return new StreamPipe(rules);
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