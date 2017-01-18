"use strict";
const comparator_1 = require("./comparator");
function trueMatcher(node) {
    return true;
}
const MATCHER = {
    decl({ decl }) {
        if (!decl) {
            return trueMatcher;
        }
        return function (node) {
            if (!node || node.type !== "decl") {
                return false;
            }
            if (this.important !== undefined && this.important !== node.important) {
                return false;
            }
            if (this.prop !== undefined && !comparator_1.default(this.prop, node.prop, node)) {
                return false;
            }
            if (this.value !== undefined && !comparator_1.default(this.value, node.value, node)) {
                return false;
            }
            return true;
        }.bind(decl);
    },
    rule({ rule }) {
        if (!rule) {
            return trueMatcher;
        }
        return function (node) {
            if (!node || node.type !== "rule") {
                return false;
            }
            if (this.selector !== undefined) {
                let isMatch = false;
                for (let item of node.selectors) {
                    if (comparator_1.default(this.selector, item, node)) {
                        isMatch = true;
                        break;
                    }
                }
                if (!isMatch) {
                    return false;
                }
            }
            return true;
        }.bind(rule);
    },
    atrule({ atrule }) {
        if (!atrule) {
            return trueMatcher;
        }
        return function (node) {
            if (!node || node.type !== "atrule") {
                return false;
            }
            if (this.name !== undefined && !comparator_1.default(this.name, node.name, node)) {
                return false;
            }
            if (this.params !== undefined && !comparator_1.default(this.params, node.params, node)) {
                return false;
            }
            return true;
        }.bind(atrule);
    },
    comment({ comment }) {
        if (!comment) {
            return trueMatcher;
        }
        return function (node) {
            if (!node || node.type !== "comment") {
                return false;
            }
            if (this.text !== undefined && !comparator_1.default(this.text, node.text, node)) {
                return false;
            }
            return true;
        }.bind(comment);
    },
    root(query) {
        return trueMatcher;
    }
};
function compileMatcher(query, type) {
    const matcher = MATCHER[type];
    if (matcher) {
        return matcher(query);
    }
    else {
        return trueMatcher;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileMatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZU1hdGNoZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2NvbXBpbGVNYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw2Q0FBc0M7QUFHdEMscUJBQXFCLElBQWtCO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sT0FBTyxHQUFHO0lBQ1osSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFtQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsVUFBUyxJQUF5QjtZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksQ0FBQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dC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