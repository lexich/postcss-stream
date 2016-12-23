import * as postcss from 'postcss';
import CDeclaration from '../src/declaration';
import test, { ContextualTestContext }    from 'ava';

import plugin, {Options} from '../src/';

function run(t: ContextualTestContext, input: string, output: string, opts?: Options | Options[]) {

    const plugins = !opts ? [plugin()] :
                    Array.isArray(opts) ? (opts as Options[]).map((p, i, arr)=> {
                        return plugin(p);
                    }) :
                    plugin(opts);

    return postcss(plugins as postcss.Plugin<any>[]).process(input)
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
            fn(child: CDeclaration) {
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
                fn(child: CDeclaration) {
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
                fn(child: CDeclaration) {
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
                fn(child: CDeclaration) {
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
            fn(child: CDeclaration) {
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
                fn(child: CDeclaration) {
                    child.value = 'red';
                }
            }, {
                query: {
                    decl: [{ prop: 'z-index', value: '10' }]
                },
                fn(child: CDeclaration) {
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
                fn(child: CDeclaration) {
                    child.value = 'red';
                }
            }]
        }, {
            streams: [{
                query: {
                    decl: [{ prop: 'color', value: 'red' }]
                },
                fn(child: CDeclaration) {
                    child.value = 'green';
                }
            }]
        }]);
});