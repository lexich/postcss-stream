var parser = require('postcss-value-parser');

export function valueProcessor(value: string, vars: any): string {
    if (!vars) { return value; }
    return parser(value).walk((node: any)=> {
        if (node.type === 'function' && node.value === 'var') {            
            if (node.nodes.length === 1) {
                const wordNode = node.nodes[0];
                if (wordNode.type !== 'word') { 
                    return;
                }
                const revar = vars[wordNode.value];
                if (!revar) { return; }
                node.type = 'word';
                node.value = revar;
                node.nodes = undefined;
            }
        }
    }).toString();
}