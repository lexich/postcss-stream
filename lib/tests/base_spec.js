"use strict";
var postcss = require("postcss");
var ava_1 = require("ava");
var _1 = require("../src/");
function run(t, input, output, opts) {
    var walkers = Array.isArray(opts) ? opts.map(_1.createStream) : [_1.createStream(opts)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvYmFzZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFFbkMsMkJBQWtEO0FBRWxELDRCQUFzRDtBQUV0RCxhQUFhLENBQXdCLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxJQUF5QjtJQUMzRixJQUFNLE9BQU8sR0FBaUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQVksQ0FBQyxHQUFHLENBQUMsZUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3pDLElBQUksQ0FBRSxVQUFBLE1BQU07UUFDVCxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELGFBQUksQ0FBQyxpQ0FBaUMsRUFBRSxVQUFBLENBQUM7SUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ1IsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQjtRQUNBLE9BQU8sRUFBRSxDQUFDO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsT0FBTztpQkFDaEI7Z0JBQ0QsRUFBRSxZQUFDLEtBQTBCO29CQUN6QixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsQ0FBQzthQUNKLENBQUM7S0FDTCxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyx5Q0FBeUMsRUFB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