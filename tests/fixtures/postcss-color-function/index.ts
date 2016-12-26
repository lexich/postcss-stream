import {createWalker} from '../../../src';
import * as postcss from 'postcss';
import {transformColorSafe} from './helper';

export default createWalker({
    streams: [{
        query: {
            decl: {
                prop: "*",
                value(s?: string): boolean {
                    return !!s && s.indexOf('color(') >= 0;
                }
            }  
        },
        fn(child: postcss.Declaration) {
            child.value = transformColorSafe(
                child.value, child.source
            );
        }
    }]
})