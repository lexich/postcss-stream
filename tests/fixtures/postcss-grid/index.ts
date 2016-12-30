// https://github.com/andyjansson/postcss-grid/blob/master/index.js
import {createStream} from '../../../src';
import getHelper, { Options } from "./helper";
import {Declaration} from 'postcss';

export default function(options?: Options) {
    const opts = options || {
        columns: 12,
		maxWidth: 960,
		gutter: 20,
		legacy: false
    };
    const helper = getHelper(opts);
    const isLast = /\s*!last\s*$/;
    return createStream([{
        decl: {
            prop: "*",
            value(s?: string) {
                return !!s && s.indexOf("grid-width(") >= 0;
            },    
            enter(decl: Declaration) {
                try {
                    decl.value = helper.callGridWidth(decl.value);
                } catch(e) {
                    throw decl.error(e.message, { plugin: 'postcss-grid' });
                }
            }
        }
     }, {
        decl: {
            prop: "*",
            value(s?: string) {
                return !!s && s.indexOf("grid-gutter(") >= 0;
            },
            enter(decl: Declaration) {
                decl.value = helper.callGridGutter(decl.value);
            }
        }
    }, {
        decl: {
            prop: "grid-column",
            enter(decl: Declaration) {
                try {
                    
                    helper.callGridColumn(decl.value, function(span: number, columns: number) {
                        decl.parent.append({
                            prop: 'float', value: 'left'
                        }).source = decl.source;
                        decl.parent.append({
                            prop: 'width', 
                            value: helper.gridWidth(span, columns) + '%'}
                        ).source = decl.source;

                        if (!(decl.value.match(isLast))) {
                            if (opts.legacy) {
                                decl.parent.append({
                                    prop: 'display', 
                                    value: 'inline'
                                }).source = decl.source;
                            }
                            decl.parent.append({
                                prop: 'margin-right', 
                                value: helper.gutterWidth(columns) + '%'
                            }).source = decl.source;
                        }
                        decl.remove();
                    });
                } catch(e) {
                    throw decl.error(e.message, { plugin: 'postcss-grid' });
                }
            }
        }
    }, {
        decl: {
            prop: ['grid-push', 'grid-pull'],
            enter(decl: Declaration) {
                try {
                    helper.callGridColumn(decl.value, function(span: number, columns: number) {
                        const width = span * helper.gridWidth(1, columns) + span * helper.gutterWidth(columns);
                        decl.parent.append({
                            prop: decl.prop === 'grid-push' ? 'margin-left' : 'margin-right',
                            value: width + '%'
                        }).source = decl.source;
                        decl.remove();
                    });
                } catch(e) {
                    throw decl.error(e.message, { plugin: 'postcss-grid' });
                }
            }
        }
    }]);
}

