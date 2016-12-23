import * as postcss from "postcss";
import { Stream } from "./interface";
export interface Options {
    streams: Stream[];
}
declare var _default: postcss.Plugin<Options>;
export default _default;
