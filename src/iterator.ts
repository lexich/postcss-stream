import * as postcss from "postcss";

export interface Stack {
    prev: Stack | null;
    node: postcss.Node;
    index: number;
}

let STACK_CACHE: Stack;

export default function(css: postcss.Root, callback: (child: postcss.Node, index: number, enter: boolean) => any): any {
    if (!css.nodes) {
        return undefined;
    }
    let stack: Stack = {
        prev: null,
        node: css,
        index: 0
    };
    let stackTmp: Stack;
    let reverseWalk = false;
    do {
        if (!reverseWalk) {
            callback(stack.node, stack.index, true);
            if ((stack.node as postcss.Container).nodes &&
                (stack.node as postcss.Container).nodes.length > 0) {
                if (STACK_CACHE) {
                    stackTmp = STACK_CACHE;
                    STACK_CACHE = STACK_CACHE.prev;
                } else {
                    stackTmp = { prev: null, node: null, index: 0, };
                }
                stackTmp.prev = stack;
                stackTmp.node = (stack.node as postcss.Container).nodes[0];
                stackTmp.index = 0;
                stack = stackTmp;
                stackTmp = null;
                // go deeper
                continue;
            }
            reverseWalk = false;
        }
        callback(stack.node, stack.index, false);
        // try go next node
        if (stack.prev) {
            stack.index += 1;
            if (stack.index < (stack.prev.node as postcss.Container).nodes.length) {
                stack.node = (stack.prev.node as postcss.Container).nodes[stack.index];
                // iterate
                continue;
            }
        }
        // up to stack
        stackTmp = stack;
        stack = stack.prev;
        STACK_CACHE = stackTmp;
        stackTmp = null;
        //
        reverseWalk = true;
    } while (!!stack);
}
