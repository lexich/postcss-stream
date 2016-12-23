"use strict";
var declaration_1 = require("./declaration");
var node_1 = require("./node");
function default_1(node, updateModel) {
    if (node.type === "decl") {
        return new declaration_1.default(updateModel, node);
    }
    else {
        return new node_1.default(updateModel, node);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=mapper.js.map