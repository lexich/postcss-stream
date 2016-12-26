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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvYmFzZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFFbkMsMkJBQWtEO0FBRWxELDRCQUFzRDtBQUV0RCxhQUFhLENBQXdCLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxJQUF5QjtJQUMzRixJQUFNLE9BQU8sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDekMsSUFBSSxDQUFFLFVBQUEsTUFBTTtRQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsYUFBSSxDQUFDLGlDQUFpQyxFQUFFLFVBQUEsQ0FBQztJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDUixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCO1FBQ0EsT0FBTyxFQUFFLENBQUM7Z0JBQ04sS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxPQUFPO2lCQUNoQjtnQkFDRCxFQUFFLFlBQUMsS0FBMEI7b0JBQ3pCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQztLQUNMLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHlDQUF5QyxFQUFF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