"use strict";
var postcss = require("postcss");
var walker_1 = require("./walker");
function createWalker(opts) {
    return new walker_1.default(opts ? opts.streams : []);
}
exports.createWalker = createWalker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFtQztBQUNuQyxtQ0FBOEI7QUFPOUIsc0JBQTZCLElBQWM7SUFDdkMsTUFBTSxDQUFDLElBQUksZ0JBQU0sQ0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRkQsb0NBRUM7O0FBRUQsa0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLE9BQWlCO0lBQ3RFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFZLEVBQUUsT0FBZTtRQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFDLFVBQVMsR0FBaUIsRUFBRSxNQUFzQjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDIn0=