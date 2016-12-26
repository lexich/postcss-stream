"use strict";
var parser = require("postcss-value-parser");
var colorFn = require("css-color-function");
var helpers = require("postcss-message-helpers");
function transformColor(value) {
    return parser(value).walk(function (node) {
        if (node.type !== "function" || node.value !== "color") {
            return;
        }
        node.value = colorFn.convert(parser.stringify(node));
        node.type = "word";
    }).toString();
}
exports.transformColor = transformColor;
function transformColorSafe(value, source) {
    return helpers.try(function transformColorValue() {
        return transformColor(value);
    }, source);
}
exports.transformColorSafe = transformColorSafe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdHMvZml4dHVyZXMvcG9zdGNzcy1jb2xvci1mdW5jdGlvbi9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzdDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzVDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRWpELHdCQUErQixLQUFhO0lBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsSUFBUztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQVJELHdDQVFDO0FBRUQsNEJBQW1DLEtBQWEsRUFBRSxNQUEwQjtJQUN4RSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNmLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQUpELGdEQUlDIn0=