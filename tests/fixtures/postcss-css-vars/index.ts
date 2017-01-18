
import {Declaration, Rule} from 'postcss';
import {valueProcessor} from './helper';
import {Query} from '../../../src/traverse';

function getScopeName(selector: string) {
    return (!selector || selector === ":root") ? undefined : selector;
}


export default function() : Query[] {
    return [{
        rule: {
            decl: {
                prop: (node: Declaration)=> node.prop.indexOf("--") >= 0,
                enter(decl: Declaration) {
                    const scopeName = getScopeName( (decl.parent as Rule).selector);
                    this.set(decl.prop, decl.value, scopeName);
                    decl.remove();
                }
            },
            leave(rule: Rule) {
                if (rule.selector === ":root") {
                    rule.remove();
                }
            }
        }
    },{
        decl: {
            value(node: Declaration) {
                return node.value.indexOf("var(") >= 0;
            },
            enter(decl: Declaration) {
                const scopeName = getScopeName( (decl.parent as Rule).selector);
                decl.value = valueProcessor(
                    decl.value, Object.assign({}, this.all(), this.all(scopeName))
                );
            }
        }
    }];
}
