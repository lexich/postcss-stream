import {createStream} from '../../../src';
import {Declaration, Rule} from 'postcss';
import {valueProcessor} from './helper';

function getScopeName(selector: string) {
    return (!selector || selector === ":root") ? undefined : selector;
}


export default function() {
    return createStream([{
        rule: {
            selector: "*",
            decl: {
                prop: (str: string)=> !!str && str.indexOf("--") >= 0,
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
            prop: "*",
            value(s?: string) {
                return !!s && s.indexOf("var(") >= 0;
            },
            enter(decl: Declaration) {
                const scopeName = getScopeName( (decl.parent as Rule).selector);
                decl.value = valueProcessor(
                    decl.value, Object.assign({}, this.all(), this.all(scopeName))
                );
            }
        }
    }]);
}