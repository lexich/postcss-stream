import * as postcss from 'postcss';
import StreamPipe from "../src/streampipe";
import test, { ContextualTestContext } from 'ava';
import { Stream } from "../src/interface";
import plugin, {createStream} from '../src/';


function run(t: ContextualTestContext, input: string, output: string, ...opts: Stream[][]) {
    const walkers: StreamPipe[] = opts.map<StreamPipe>(createStream);
    return postcss(plugin(walkers)).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}


test('simple change decl with [color]', t => {
    return run(t,
        'a{ color: #000; }',
        'a{ color: red; }', [{
            decl: {
                prop: 'color',
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }]);
});

test('simple change decl with all pattern [*]', t => {
    return run(t,
        'a{ color: #000; background: black; }',
        'a{ color: red; background: red; }',
        [{
            decl: {
                prop: '*',
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }]);
});

test('simple change decl without anything', t => {
    return run(t,
        'a{ color: #000; background: black; }',
        'a{ color: red; background: red; }',
        [{
            decl: {
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }]);
});

test('simple change decl with array decl', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 10; background: red; }',
        [{
            decl: {
                prop: ['color', 'background'],
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }]);
});

test('simple change decl with all pattern array decl', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 10; background: black; }',
        [{
            decl: {
                array: [
                    { prop: 'color', value: '#000' }, 
                    { prop: 'z-index', value: '11' }
                ],
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }]);
});

test('simple change decl with prop', t => {
    return run(t,
        '.test{ color: #000; }.test1{ color: #000; }',
        '.test{ color: red; }.test1{ color: #000; }',
        [{
            rule: {
                selector: '.test',
                decl: {
                    prop: 'color',
                    enter(child: postcss.Declaration) {
                        child.value = 'red';
                    }
                }
            }
        }]);
});

test('simple change decl with 2 streams', t => {
    return run(t,
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: red; z-index: 11; background: black; }',
        [{
            decl: { 
                prop: 'color', 
                value: '#000',
                enter(child: postcss.Declaration) {
                    child.value = 'red';
                }
            }
        }, {
            decl: { 
                prop: 'z-index', 
                value: '10',
                enter(child: postcss.Declaration) {
                    child.value = '11';
                }
            }  
        }]);
});

test('overwriting changes decl with 2 streams', t => {
    return run(t, 
        'a{ color: #000; z-index: 10; background: black; }',
        'a{ color: green; z-index: 10; background: black; }',
        // stream 1
        [{
            decl: { 
                prop: 'color', 
                value: '#000',
                enter(child: postcss.Declaration) {                    
                    child.value = 'red';
                }
            }
        }], 
        // stream2
        [{
            decl: { 
                prop: 'color', 
                value: 'red',
                enter(child: postcss.Declaration) {
                    child.value = 'green';
                }
            }
        }]
    );
});

test("insert before", t => {
    return run(t, 
        ".test { color: red; }",
        ".test1 { color: black; }\n.test { color: red; }", [{
            rule: {
                selector: ".test",
                decl: {
                    prop: "color",
                    value: "red",
                    enter(decl: postcss.Declaration) {
                        decl.parent.cloneBefore({ selector: ".test1"});
                    }
                }
            }
        }, {
            rule: {
                selector: ".test1",
                decl: {
                    prop: "color",
                    value: "red",
                    enter(decl: postcss.Declaration) {
                        decl.value = "black";
                    }
                }
            }
        }]
    );
});