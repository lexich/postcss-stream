import * as postcss from 'postcss';
import test, { ContextualTestContext } from 'ava';
import stream from "./fixtures/postcss-css-vars";
import plugin from "../src";
import {readFileSync} from 'fs';
import {join} from 'path';

function run(t: ContextualTestContext, code: string) {
    return postcss().use(plugin([stream()])).process(code);
}

const folder = join(__dirname, "..", "..", 'tests', 'fixtures', 'postcss-css-vars');

test("test.css", t => {
    const code = readFileSync(
        join(folder, 'test.css'), 'utf-8'
    ).toString();
    const expected = readFileSync(
        join(folder, 'test.expected.css'), 'utf-8'
    ).toString();
    return run(t, code).then(result => {
        t.deepEqual(result.css, expected);
        t.deepEqual(result.warnings().length, 0);
    });
});