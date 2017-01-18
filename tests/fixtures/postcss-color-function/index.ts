import * as postcss from 'postcss';
import {transformColorSafe} from './helper';
import {Query} from '../../../src/interfaces';

const query: Query[] = [{
    decl: {
        value(node: postcss.Declaration): boolean {
            return node.value.indexOf('color(') >= 0;
        },
        enter(child: postcss.Declaration) {
            child.value = transformColorSafe(
                child.value, child.source
            );
        }
    }
}];

export default query;
