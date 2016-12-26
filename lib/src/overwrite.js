"use strict";
var match_1 = require("./match");
function overwriteProps(node, name) {
    var innerName = "__" + name + "__";
    if (node[innerName]) {
        return;
    }
    node[innerName] = node[name];
    delete node[name];
    Object.defineProperty(node, name, {
        get: function () {
            return node[innerName];
        },
        set: function (value) {
            this[innerName] = value;
            match_1.sendNodeNext(this);
        }
    });
}
function default_1(child) {
    if (child.type === "decl") {
        overwriteProps(child, "value");
    }
    return child;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcndyaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL292ZXJ3cml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsaUNBQXVDO0FBRXZDLHdCQUF3QixJQUFTLEVBQUUsSUFBWTtJQUMzQyxJQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtRQUM5QixHQUFHO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsR0FBRyxZQUFDLEtBQUs7WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLG9CQUFZLENBQUMsSUFBYSxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxtQkFBd0IsS0FBWTtJQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEIsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDOztBQUxELDRCQUtDIn0=