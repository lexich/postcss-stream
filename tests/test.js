"use strict";
var postcss = require("postcss");
var ava_1 = require("ava");
var _1 = require("../src/");
function run(t, input, output, opts) {
    var walkers = Array.isArray(opts) ? opts.map(_1.createWalker) : [_1.createWalker(opts)];
    return postcss(_1.default(walkers)).process(input)
        .then(function (result) {
        t.deepEqual(result.css, output);
        t.deepEqual(result.warnings().length, 0);
    });
}
ava_1.default('simple change decl with [color]', function (t) {
    return run(t, 'a{ color: #000; }', 'a{ color: red; }', {
        streams: [{
                query: {
                    decl: 'color'
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }]
    });
});
ava_1.default('simple change decl with all pattern [*]', function (t) {
    return run(t, 'a{ color: #000; background: black; }', 'a{ color: red; background: red; }', {
        streams: [{
                query: {
                    decl: '*'
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }]
    });
});
ava_1.default('simple change decl with array decl', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 10; background: red; }', {
        streams: [{
                query: {
                    decl: ['color', 'background']
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }]
    });
});
ava_1.default('simple change decl with all pattern array decl', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 10; background: black; }', {
        streams: [{
                query: {
                    decl: [
                        { prop: 'color', value: '#000' },
                        { prop: 'z-index', value: '11' }
                    ]
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }]
    });
});
ava_1.default('simple change decl with prop', function (t) {
    return run(t, '.test{ color: #000; }.test1{ color: #000; }', '.test{ color: red; }.test1{ color: #000; }', {
        streams: [{
                query: {
                    decl: 'color',
                    rule: '.test'
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }]
    });
});
ava_1.default('simple change decl with 2 streams', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 11; background: black; }', {
        streams: [{
                query: {
                    decl: [{ prop: 'color', value: '#000' }]
                },
                fn: function (child) {
                    child.value = 'red';
                }
            }, {
                query: {
                    decl: [{ prop: 'z-index', value: '10' }]
                },
                fn: function (child) {
                    child.value = '11';
                }
            }]
    });
});
ava_1.default('overwriting changes decl with 2 streams', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: green; z-index: 10; background: black; }', [{
            streams: [{
                    query: {
                        decl: [{ prop: 'color', value: '#000' }]
                    },
                    fn: function (child) {
                        child.value = 'red';
                    }
                }]
        }, {
            streams: [{
                    query: {
                        decl: [{ prop: 'color', value: 'red' }]
                    },
                    fn: function (child) {
                        child.value = 'green';
                    }
                }]
        }]);
});
//# sourceMappingURL=test.js.map