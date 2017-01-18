import * as postcss from 'postcss';
import test from 'ava';
import stream from "./fixtures/postcss-css-vars";
import plugin from "../src";
import {readFileSync} from 'fs';
import {join} from 'path';

function run(code: string) {
    return postcss().use(plugin([stream()])).process(code);
}

const folder = join(__dirname, "..", "..", 'tests', 'fixtures', 'postcss-css-vars');

test.skip("test.css", t => {
    const code = readFileSync(
        join(folder, 'test.css'), 'utf-8'
    ).toString();
    const expected = readFileSync(
        join(folder, 'test.expected.css'), 'utf-8'
    ).toString();
    return run(code).then(result => {
        t.deepEqual(result.css, expected);
        t.deepEqual(result.warnings().length, 0);
    });
});
