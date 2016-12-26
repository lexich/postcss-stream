"use strict";
var postcss = require("postcss");
var fs_1 = require("fs");
var path_1 = require("path");
var ava_1 = require("ava");
var colorFunction = require("postcss-color-function");
var postcss_color_function_1 = require("./fixtures/postcss-color-function");
var src_1 = require("../src");
function run(t, code) {
    return Promise.all([
        postcss().use(src_1.default([postcss_color_function_1.default])).process(code),
        postcss().use(colorFunction()).process(code)
    ]).then(function (result) {
        t.deepEqual(result[0].css, result[1].css);
        t.deepEqual(result[0].warnings().length, 0);
    });
}
ava_1.default('color.css', function (t) {
    var file = path_1.join(__dirname, "..", "..", 'tests', 'fixtures', 'postcss-color-function', 'color.css');
    var text1 = fs_1.readFileSync(file).toString();
    return run(t, text1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvcGx1Z2luc19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFDbkMseUJBQWdDO0FBQ2hDLDZCQUEwQjtBQUMxQiwyQkFBa0Q7QUFDbEQsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDeEQsNEVBQXVEO0FBQ3ZELDhCQUE0QjtBQUU1QixhQUFhLENBQXdCLEVBQUUsSUFBWTtJQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNmLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFNLENBQUMsQ0FBQyxnQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztLQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtRQUNWLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGFBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQSxDQUFDO0lBQ2YsSUFBTSxJQUFJLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckcsSUFBTSxLQUFLLEdBQUcsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyJ9