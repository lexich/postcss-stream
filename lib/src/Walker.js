"use strict";
var processQuery_1 = require("./processQuery");
var match_1 = require("./match");
var linkedlist_1 = require("./linkedlist");
var overwrite_1 = require("./overwrite");
var meta_1 = require("./meta");
var Walker = (function () {
    function Walker(streams, prevWalker) {
        var _this = this;
        this.streams = streams;
        this.query = {
            decl: linkedlist_1.init(),
            rule: linkedlist_1.init()
        };
        this.walk = function (child) {
            var queries = processQuery_1.expressionByType(_this.query, child.type);
            if (!queries) {
                return;
            }
            var iter = queries.next;
            var query;
            while (iter.data !== linkedlist_1.NONE) {
                query = iter.data;
                if (match_1.default(child, query)) {
                    linkedlist_1.add(child, query.buffer);
                    meta_1.setMeta(child, "expression", query);
                    return;
                }
                iter = iter.next;
            }
            if (_this.nextWalker) {
                _this.nextWalker.walk(child);
            }
        };
        this.setPrevWalker(prevWalker);
        for (var _i = 0, streams_1 = streams; _i < streams_1.length; _i++) {
            var stream = streams_1[_i];
            this.query = processQuery_1.default(stream, this.query, this);
        }
    }
    Walker.prototype.getPrevWalker = function () {
        return this.prevWalker;
    };
    Walker.prototype.setPrevWalker = function (prevWalker) {
        this.prevWalker = prevWalker;
        if (prevWalker) {
            prevWalker.setNextWalker(this);
        }
    };
    Walker.prototype.setNextWalker = function (nextWalker) {
        this.nextWalker = nextWalker;
    };
    Walker.prototype.getNextWalker = function () {
        return this.nextWalker;
    };
    Walker.prototype.run = function (css, result) {
        css.walk(this.walk);
        this.execute();
    };
    Walker.prototype.execute = function () {
        var _this = this;
        var item;
        var list;
        var iter;
        ["decl", "rule"].forEach(function (type) {
            list = processQuery_1.expressionByType(_this.query, type);
            if (!list) {
                return;
            }
            iter = list.next;
            while (iter.data !== linkedlist_1.NONE) {
                item = iter.data;
                while (!linkedlist_1.isEmpty(item.buffer)) {
                    var node = linkedlist_1.shift(item.buffer);
                    item.fn(overwrite_1.default(node));
                }
                iter = iter.next;
            }
        });
        if (this.nextWalker) {
            this.nextWalker.execute();
        }
    };
    return Walker;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Walker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fsa2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0NBQWdFO0FBQ2hFLGlDQUE0QjtBQUM1QiwyQ0FBNkU7QUFDN0UseUNBQW9DO0FBQ3BDLCtCQUFpQztBQUVqQztJQVFJLGdCQUFvQixPQUFpQixFQUFFLFVBQW1CO1FBQTFELGlCQUtDO1FBTG1CLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFQOUIsVUFBSyxHQUFVO1lBQ2xCLElBQUksRUFBRSxpQkFBSSxFQUFtQjtZQUM3QixJQUFJLEVBQUUsaUJBQUksRUFBbUI7U0FDaEMsQ0FBQztRQXlERixTQUFJLEdBQUcsVUFBQyxLQUFZO1lBQ2hCLElBQU0sT0FBTyxHQUFvQywrQkFBZ0IsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQUMsQ0FBQztZQUN6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksS0FBc0IsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQUksRUFBRSxDQUFDO2dCQUN4QixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQXVCLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLGVBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixnQkFBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pCLGNBQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUVwQyxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixDQUFDO1lB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