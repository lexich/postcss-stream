"use strict";
let STACK_CACHE;
function default_1(css, callback) {
    if (!css.nodes) {
        return undefined;
    }
    let stack = {
        prev: null,
        node: css,
        index: 0
    };
    let stackTmp;
    let reverseWalk = false;
    do {
        if (!reverseWalk) {
            callback(stack.node, stack.index, true);
            if (stack.node.nodes &&
                stack.node.nodes.length > 0) {
                if (STACK_CACHE) {
                    stackTmp = STACK_CACHE;
                    STACK_CACHE = STACK_CACHE.prev;
                }
                else {
                    stackTmp = { prev: null, node: null, index: 0, };
                }
                stackTmp.prev = stack;
                stackTmp.node = stack.node.nodes[0];
                stackTmp.index = 0;
                stack = stackTmp;
                stackTmp = null;
                continue;
            }
            reverseWalk = false;
        }
        callback(stack.node, stack.index, false);
        if (stack.prev) {
            stack.index += 1;
            if (stack.index < stack.prev.node.nodes.length) {
                stack.node = stack.prev.node.nodes[stack.index];
                continue;
            }
        }
        stackTmp = stack;
        stack = stack.prev;
        STACK_CACHE = stackTmp;
        stackTmp = null;
        reverseWalk = true;
    } while (!!stack);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0b3IuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2l0ZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSxJQUFJLFdBQWtCLENBQUM7QUFFdkIsbUJBQXdCLEdBQWlCLEVBQUUsUUFBcUU7SUFDNUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxHQUFVO1FBQ2YsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztJQUNGLElBQUksUUFBZSxDQUFDO0lBQ3BCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixHQUFHLENBQUM7UUFDQSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDZixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUEwQixDQUFDLEtBQUs7Z0JBQ3RDLEtBQUssQ0FBQyxJQUEwQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxRQUFRLEdBQUcsV0FBVyxDQUFDO29CQUN2QixXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDbkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixRQUFRLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUNyRCxDQUFDO2dCQUNELFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixRQUFRLENBQUMsSUFBSSxHQUFJLEtBQUssQ0FBQyxJQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBRWhCLFFBQVEsQ0FBQztZQUNiLENBQUM7WUFDRCxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQTBCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLEtBQUssQ0FBQyxJQUFJLEdBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUEwQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXZFLFFBQVEsQ0FBQztZQUNiLENBQUM7UUFDTCxDQUFDO1FBRUQsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNuQixXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUN0QixDQUFDOztBQWxERCw0QkFrREMifQ==