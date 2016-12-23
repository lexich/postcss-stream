"use strict";
var appendNodeToBuffer_1 = require("./appendNodeToBuffer");
var processQuery_1 = require("./processQuery");
var match_1 = require("./match");
var mapper_1 = require("./mapper");
var Walker = (function () {
    function Walker(streams, nextWalker) {
        var _this = this;
        this.streams = streams;
        this.query = { decl: [], rule: [] };
        this.updateModel = function (node) {
            _this.updateNodeList = {
                next: _this.updateNodeList,
                data: node
            };
        };
        this.walk = function (child) {
            var queries = child.type === "decl" ? _this.query.decl :
                child.type === "rule" ? _this.query.rule : [];
            for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
                var query = queries_1[_i];
                if (match_1.default(child, query)) {
                    appendNodeToBuffer_1.default(child, query);
                }
            }
            if (_this.nextWalker) {
                _this.nextWalker.walk(child);
            }
        };
        this.nextWalker = nextWalker;
        for (var _i = 0, streams_1 = streams; _i < streams_1.length; _i++) {
            var stream = streams_1[_i];
            this.query = processQuery_1.default(stream, this.query);
        }
    }
    Walker.prototype.run = function (css, result) {
        css.walk(this.walk);
        this.execute();
    };
    Walker.prototype.execute = function () {
        var queries = [this.query.decl, this.query.rule];
        var buffer, query, item;
        for (var _i = 0, queries_2 = queries; _i < queries_2.length; _i++) {
            query = queries_2[_i];
            for (var _a = 0, query_1 = query; _a < query_1.length; _a++) {
                item = query_1[_a];
                buffer = item.rootBuffer;
                while (buffer.data) {
                    var node = !this.nextWalker ? buffer.data : mapper_1.default(buffer.data, this.updateModel);
                    item.fn(node);
                    buffer = buffer.next;
                }
            }
        }
        if (this.nextWalker) {
            while (this.updateNodeList) {
                var node = this.updateNodeList.data;
                this.nextWalker.walk(node);
                this.updateNodeList = this.updateNodeList.next;
            }
            this.nextWalker.execute();
        }
    };
    return Walker;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Walker;
//# sourceMappingURL=Walker.js.map