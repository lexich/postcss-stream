import {createStream} from '../../../src';
import * as postcss from 'postcss';
import {transformColorSafe} from './helper';

export default createStream([{
    decl: {
        prop: "*",
        value(s?: string): boolean {
            return !!s && s.indexOf('color(') >= 0;
        },
        enter(child: postcss.Declaration) {
            child.value = transformColorSafe(
                child.value, child.source
            );
        }
    }
}]);