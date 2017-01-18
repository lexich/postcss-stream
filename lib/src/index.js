"use strict";
const postcss = require("postcss");
const traverse_1 = require("./traverse");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postcss.plugin('postcss-stream', function (queries) {
    return function (css, result) {
        return traverse_1.traverse(css, queries);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQ0FBbUM7QUFDbkMseUNBQW9DOztBQUdwQyxrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLFVBQVMsT0FBZ0I7SUFDckUsTUFBTSxDQUFDLFVBQVMsR0FBaUIsRUFBRSxNQUFzQjtRQUNyRCxNQUFNLENBQUMsbUJBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==