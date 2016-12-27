"use strict";
var match_1 = require("./match");
var meta_1 = require("./meta");
function overwrite(child) {
    var proxy = meta_1.getMeta(child, "proxy");
    if (proxy) {
        return proxy;
    }
    else {
        return meta_1.setMeta(child, "proxy", new Proxy(child, {
            set: function (target, prop, value, receiver) {
                if (target) {
                    target[prop] = value;
                    match_1.sendNodeNext(target);
                    return true;
                }
                return false;
            },
            get: function (target, prop) {
                if (!target) {
                    return undefined;
                }
                if (prop === "$$self") {
                    return target;
                }
                var getter = target[prop];
                if (prop === "parent" && getter) {
                    return overwrite(getter);
                }
                else if (prop === "index" && getter) {
                    return function (proxy) {
                        return target.index(proxy.$$self);
                    };
                }
                else {
                    return getter;
                }
            }
        }));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = overwrite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcndyaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL292ZXJ3cml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsaUNBQXVDO0FBQ3ZDLCtCQUEwQztBQUUxQyxtQkFBa0MsS0FBWTtJQUMxQyxJQUFNLEtBQUssR0FBRyxjQUFPLENBQVEsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxjQUFPLENBQVEsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBUSxLQUFLLEVBQUU7WUFDMUQsR0FBRyxZQUFDLE1BQWEsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFFBQWE7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDOUIsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2hCLENBQUM7WUFDRCxHQUFHLFlBQUMsTUFBYSxFQUFFLElBQVk7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQU0sTUFBTSxHQUFJLE1BQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxVQUFTLEtBQVk7d0JBQ3hCLE1BQU0sQ0FBRSxNQUFjLENBQUMsS0FBSyxDQUFFLEtBQWEsQ0FBQyxNQUFlLENBQUMsQ0FBQztvQkFDakUsQ0FBQyxDQUFDO2dCQUNOLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUM7U0FDSixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7QUFDTCxDQUFDOztBQWxDRCw0QkFrQ0MifQ==