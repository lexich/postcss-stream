var parser = require('postcss-value-parser');

export function valueProcessor(value: string, vars: any): string {
    if (!vars) { return value; }
    return parser(value).walk((node: any)=> {
        if (node.type === 'function' && node.value === 'var') {
            const len = node.nodes.length;
            if (len >= 1) {
                const wordNode = node.nodes[0];
                if (wordNode.type !== 'word') { 
                    return;
                }
                const revar = vars[wordNode.value];
                if (revar) {
                    node.value = revar;
                } else {
                    if (len >= 3) {
                        if (node.nodes[1].type !== "div" || node.nodes[1].value !== ",") {
                            return;
                        }
                        const wordNode = node.nodes[2];
                        if (wordNode.type !== 'word') { 
                            return;
                        }
                        node.value = vars[wordNode.value] || wordNode.value;
                    } else {
                        return;   
                    }
                }
            } else {
                node.value = "";
            }
            node.type = 'word';
            node.nodes = undefined;
        }
    }).toString();
}