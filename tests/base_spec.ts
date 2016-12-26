import * as postcss from 'postcss';
import StreamPipe from "../src/walker";
import test, { ContextualTestContext } from 'ava';

import plugin, {Options, createStream} from '../src/';

function run(t: ContextualTestContext, input: string, output: string, opts: Options | Options[]) {
    const walkers: StreamPipe[] = Array.isArray(opts) ? opts.map(createStream) : [createStream(opts)];
    return postcss(plugin(walkers)).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('simple change decl with [color]', t => {
    return run(t,
        'a{ color: #000; }',
        'a{ color: red; }',
        {
        streams: [{
            query: {
                decl: 'color'
            },
            fn(child: postcss.Declaration) {
                child.value = 'red';
            }
        }]
    });
});

test('simple change decl with all pattern [*]', t => {
    return run(t,
        'a{ color: #000; background: black; }',
        'a{ color: red; background: red; }',
        {
            streams: [{
                query: {
                    decl: '*'
                },
                fn(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }]
        });
});

test('simple change decl with array decl', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 10; background: red; }',
        {
            streams: [{
                query: {
                    decl: ['color', 'background']
                },
                fn(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }]
        });
});

test('simple change decl with all pattern array decl', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 10; background: black; }',
        {
            streams: [{
                query: {
                    decl: [
                        { prop: 'color', value: '#000' }, 
                        { prop: 'z-index', value: '11' }
                    ]
                },
                fn(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }]
        });
});

test('simple change decl with prop', t => {
    return run(t,
        '.test{ color: #000; }.test1{ color: #000; }',
        '.test{ color: red; }.test1{ color: #000; }',
        {
        streams: [{
            query: {
                decl: 'color',
                rule: '.test'
            },
            fn(child: postcss.Declaration) {
                child.value = 'red';
            }
        }]
    });
});

test('simple change decl with 2 streams', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 11; background: black; }',
        {
            streams: [{
                query: {
                    decl: [{ prop: 'color', value: '#000' }]
                },
                fn(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }, {
                query: {
                    decl: [{ prop: 'z-index', value: '10' }]
                },
                fn(child: postcss.Declaration) {
                    child.value = '11';
                }
            }]
        });
});

test('overwriting changes decl with 2 streams', t => {
    return run(t, 
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: green; z-index: 10; background: black; }',
        [{
            streams: [{
                query: {
                    decl: [{ prop: 'color', value: '#000' }]
                },
                fn(child: postcss.Declaration) {                    
                    child.value = 'red';
                }
            }]
        }, {
            streams: [{
                query: {
                    decl: [{ prop: 'color', value: 'red' }]
                },
                fn(child: postcss.Declaration) {
                    child.value = 'green';
                }
            }]
        }]);
});