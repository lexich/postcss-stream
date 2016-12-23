"use strict";
var postcss = require("postcss");
var Walker_1 = require("./Walker");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postcss.plugin('postcss-stream', function (opts) {
    var walker = new Walker_1.default(opts ? opts.streams : []);
    return function (css, result) {
        walker.run(css, result);
    };
});
//# sourceMappingURL=index.js.map