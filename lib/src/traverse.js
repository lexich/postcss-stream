"use strict";
const iterator_1 = require("./iterator");
const compile_1 = require("./compile");
const match_1 = require("./match");
function traverse(css, queries) {
    let isDirty = false;
    const iter = { val: 1 };
    const visitors = { enter: [], leave: [] };
    for (let query of queries) {
        compile_1.default(query, iter, null, visitors);
    }
    const iterate = function (node, index, enter) {
        let ref = (enter ? node._refEnter : node._refLeave) || 0;
        const arr = enter ? visitors.enter : visitors.leave;
        for (let visit of arr) {
            if (ref >= visit.ref) {
                continue;
            }
            else {
                ref = visit.ref;
            }
            if (visit.type !== node.type) {
                continue;
            }
            if (match_1.default(node, visit)) {
                isDirty = true;
                visit.fn(node);
            }
        }
        if (enter) {
            node._refEnter = ref;
        }
        else {
            node._refLeave = ref;
        }
    };
    do {
        isDirty = false;
        iterator_1.default(css, iterate);
    } while (isDirty);
}
exports.traverse = traverse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2UuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL3RyYXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBc0M7QUFDdEMsdUNBQWdDO0FBQ2hDLG1DQUE0QjtBQUc1QixrQkFBeUIsR0FBaUIsRUFBRSxPQUFnQjtJQUd4RCxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFFN0IsTUFBTSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDeEIsTUFBTSxRQUFRLEdBQXNCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDN0QsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4QixpQkFBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFTLElBQWtCLEVBQUUsS0FBYSxFQUFFLEtBQWM7UUFDdEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUksSUFBZ0IsQ0FBQyxTQUFTLEdBQUksSUFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkYsTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNwRCxHQUFHLENBQUEsQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsUUFBUSxDQUFDO1lBQ2IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3BCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLFFBQVEsQ0FBQztZQUFDLENBQUM7WUFDM0MsRUFBRSxDQUFDLENBQUMsZUFBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFnQixDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0gsSUFBZ0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixHQUFHLENBQUM7UUFDQSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUMsUUFBTyxPQUFPLEVBQUU7QUFDckIsQ0FBQztBQXJDRCw0QkFxQ0MifQ==