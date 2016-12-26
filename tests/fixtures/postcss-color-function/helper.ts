// https://github.com/postcss/postcss-color-function/blob/master/index.js

import * as postcss from "postcss";
var parser = require("postcss-value-parser");
var colorFn = require("css-color-function");
var helpers = require("postcss-message-helpers");

export function transformColor(value: string): string {
    return parser(value).walk(function(node: any) {
        if (node.type !== "function" || node.value !== "color") {
            return;
        }
        node.value = colorFn.convert(parser.stringify(node));
        node.type = "word";
    }).toString();
}

export function transformColorSafe(value: string, source: postcss.NodeSource) {
    return helpers.try(function transformColorValue() {
        return transformColor(value);
    }, source);
}