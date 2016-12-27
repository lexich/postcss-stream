"use strict";
var postcss = require("postcss");
var ava_1 = require("ava");
var _1 = require("../src/");
function run(t, input, output, opts) {
    var walkers = Array.isArray(opts) ?
        opts.map(function (p) { return _1.createStream(p.stream); }) :
        [_1.createStream(opts.stream)];
    return postcss(_1.default(walkers)).process(input)
        .then(function (result) {
        t.deepEqual(result.css, output);
        t.deepEqual(result.warnings().length, 0);
    });
}
ava_1.default('simple change decl with [color]', function (t) {
    return run(t, 'a{ color: #000; }', 'a{ color: red; }', {
        stream: [{
                decl: {
                    prop: 'color',
                    enter: function (child) {
                        child.value = 'red';
                    }
                }
            }]
    });
});
ava_1.default('simple change decl with all pattern [*]', function (t) {
    return run(t, 'a{ color: #000; background: black; }', 'a{ color: red; background: red; }', {
        stream: [{
                decl: {
                    prop: '*',
                    enter: function (child) {
                        child.value = 'red';
                    }
                }
            }]
    });
});
ava_1.default('simple change decl with array decl', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 10; background: red; }', {
        stream: [{
                decl: {
                    prop: ['color', 'background'],
                    enter: function (child) {
                        child.value = 'red';
                    }
                }
            }]
    });
});
ava_1.default.skip('simple change decl with all pattern array decl', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 10; background: black; }', {
        stream: [{
                decl: {
                    enter: function (child) {
                        child.value = 'red';
                    }
                }
            }]
    });
});
ava_1.default.skip('simple change decl with prop', function (t) {
    return run(t, '.test{ color: #000; }.test1{ color: #000; }', '.test{ color: red; }.test1{ color: #000; }', {
        stream: [{
                rule: {
                    selector: '.test',
                    decl: {
                        prop: 'color',
                        enter: function (child) {
                            child.value = 'red';
                        }
                    }
                }
            }]
    });
});
ava_1.default('simple change decl with 2 streams', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: red; z-index: 11; background: black; }', {
        stream: [{
                decl: {
                    prop: 'color',
                    value: '#000',
                    enter: function (child) {
                        child.value = 'red';
                    }
                }
            }, {
                decl: {
                    prop: 'z-index',
                    value: '10',
                    enter: function (child) {
                        child.value = '11';
                    }
                }
            }]
    });
});
ava_1.default('overwriting changes decl with 2 streams', function (t) {
    return run(t, 'a{ color: #000; z-index: 10; background: black; }', 'a{ color: green; z-index: 10; background: black; }', [{
            stream: [{
                    decl: {
                        prop: 'color',
                        value: '#000',
                        enter: function (child) {
                            child.value = 'red';
                        }
                    }
                }]
        }, {
            stream: [{
                    decl: {
                        prop: 'color',
                        value: 'red',
                        enter: function (child) {
                            child.value = 'green';
                        }
                    }
                }]
        }]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvYmFzZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFFbkMsMkJBQWtEO0FBRWxELDRCQUE2QztBQU03QyxhQUFhLENBQXdCLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxJQUF5QjtJQUUzRixJQUFNLE9BQU8sR0FBaUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBYSxVQUFDLENBQUMsSUFBSSxPQUFBLGVBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCLENBQUM7UUFDbEQsQ0FBQyxlQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3pDLElBQUksQ0FBRSxVQUFBLE1BQU07UUFDVCxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELGFBQUksQ0FBQyxpQ0FBaUMsRUFBRSxVQUFBLENBQUM7SUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ1IsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUFFO1FBQ3BCLE1BQU0sRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsT0FBTztvQkFDWCxLQUFLLFlBQUMsS0FBMEI7d0JBQzVCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN4QixDQUFDO2lCQUNKO2FB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