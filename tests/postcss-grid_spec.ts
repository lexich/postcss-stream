// https://github.com/andyjansson/postcss-grid/blob/master/test/test.js
import * as postcss from 'postcss';
import test, { ContextualTestContext } from 'ava';
const postcssGrid = require("postcss-grid");
import stream from "./fixtures/postcss-grid";
import { Options } from "./fixtures/postcss-grid/helper";
import plugin from "../src";

function run(t: ContextualTestContext, code: string, opts?: Options) {
    return Promise.all([
        postcss().use(plugin([stream(opts)])).process(code),
        postcss().use(postcssGrid(opts)).process(code)
    ]).then(result => {
        t.deepEqual(result[0].css, result[1].css);
        t.deepEqual(result[0].warnings().length, 0);
    });
}

[
    '.element{grid-column: 1/12;}',
    '.element{grid-column: 1/12 !last;}',
    '.element{grid-column: 6/12;}',
    '.element{grid-column: 3/6;}',
    '.element{grid-column: 12/12 !last;}',
    '.element{grid-push: 1/12;}',
    '.element{grid-pull: 1/12;}',
    '.element{width: grid-width(1/12);}',
    '.element{margin-left: grid-gutter(12);}'
].forEach((code)=> {
    test(code, t => run(t, code));
});

 test("legacy", t => {
     const settings: Options = {
        columns: 12,
        maxWidth: 960,
        gutter: 20,
        legacy: true
    };
    const code = '.element{grid-column: 1/12;}';
    return run(t, code, settings);
 });