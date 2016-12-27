"use strict";
var postcss = require("postcss");
var walker_1 = require("./walker");
function createStream(opts) {
    var rules = !opts ? [] : Array.isArray(opts) ? opts : [opts];
    return new walker_1.default(rules);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFtQztBQUNuQyxtQ0FBa0M7QUFHbEMsc0JBQTZCLElBQXVCO0lBQ2hELElBQU0sS0FBSyxHQUFhLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sQ0FBQyxJQUFJLGdCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUhELG9DQUdDOztBQUVELGtCQUFlLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxPQUFxQjtJQUMxRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBZ0IsRUFBRSxPQUFtQjtRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFDLFVBQVMsR0FBaUIsRUFBRSxNQUFzQjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDIn0=