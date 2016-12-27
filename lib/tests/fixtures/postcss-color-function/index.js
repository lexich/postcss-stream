"use strict";
var src_1 = require("../../../src");
var helper_1 = require("./helper");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = src_1.createStream([{
        decl: {
            prop: "*",
            value: function (s) {
                return !!s && s.indexOf('color(') >= 0;
            },
            enter: function (child) {
                child.value = helper_1.transformColorSafe(child.value, child.source);
            }
        }
    }]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0cy9maXh0dXJlcy9wb3N0Y3NzLWNvbG9yLWZ1bmN0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQ0FBMEM7QUFFMUMsbUNBQTRDOztBQUU1QyxrQkFBZSxrQkFBWSxDQUFDLENBQUM7UUFDekIsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLEdBQUc7WUFDVCxLQUFLLEVBQUwsVUFBTSxDQUFVO2dCQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxLQUFLLFlBQUMsS0FBMEI7Z0JBQzVCLEtBQUssQ0FBQyxLQUFLLEdBQUcsMkJBQWtCLENBQzVCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FDNUIsQ0FBQztZQUNOLENBQUM7U0FDSjtLQUNKLENBQUMsQ0FBQyxDQUFDIn0=