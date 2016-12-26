import * as postcss from "postcss";
import Walker from "./walker";
import { Stream } from "./interface";
export interface Options {
    streams: Stream[];
}
export declare function createWalker(opts?: Options): Walker;
declare var _default: postcss.Plugin<Walker[]>;
export default _default;
