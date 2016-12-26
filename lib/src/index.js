"use strict";
var postcss = require("postcss");
var walker_1 = require("./walker");
function createStream(opts) {
    return new walker_1.default(opts ? opts.streams : []);
}
exports.createStream = createStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postcss.plugin('postcss-stream', function (walkers) {
    walkers.concat().reduce(function (prev, current) {
        prev.setNextWalker(current);
        return current;
    });
    var walker = walkers[0];
    return function (css, result) {
        if (walker) {
            walker.run(css, result);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFtQztBQUNuQyxtQ0FBa0M7QUFPbEMsc0JBQTZCLElBQWM7SUFDdkMsTUFBTSxDQUFDLElBQUksZ0JBQVUsQ0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRkQsb0NBRUM7O0FBRUQsa0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLE9BQXFCO0lBQzFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFnQixFQUFFLE9BQW1CO1FBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNILElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQUMsVUFBUyxHQUFpQixFQUFFLE1BQXNCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==