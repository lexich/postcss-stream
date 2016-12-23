"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var node_1 = require("./node");
var CDeclaration = (function (_super) {
    __extends(CDeclaration, _super);
    function CDeclaration() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CDeclaration.prototype, "value", {
        get: function () {
            return this.node.value;
        },
        set: function (value) {
            this.updateModel(this.node);
            this.node.value = value;
        },
        enumerable: true,
        configurable: true
    });
    return CDeclaration;
}(node_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CDeclaration;
//# sourceMappingURL=declaration.js.map