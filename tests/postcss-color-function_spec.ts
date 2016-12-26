import * as postcss from 'postcss';
import {readFileSync} from 'fs';
import {join} from 'path';
import test, { ContextualTestContext } from 'ava';
const colorFunction = require("postcss-color-function");
import stream from "./fixtures/postcss-color-function";
import plugin from "../src";

function run(t: ContextualTestContext, code: string) {
    return Promise.all([
        postcss().use(plugin([stream])).process(code),
        postcss().use(colorFunction()).process(code)
    ]).then(result => {
        t.deepEqual(result[0].css, result[1].css);
        t.deepEqual(result[0].warnings().length, 0);
    });
}

test('color.css', t => {
    const file = join(__dirname, "..", "..", 'tests', 'fixtures', 'postcss-color-function', 'color.css');
    const text1 = readFileSync(file).toString();
    return run(t, text1);
});