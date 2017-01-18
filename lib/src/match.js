"use strict";
function match(node, visit) {
    if (!visit.match(node)) {
        return false;
    }
    let vParent = visit.parent;
    let nParent = node.parent;
    while (vParent) {
        if (!vParent.match(nParent)) {
            return false;
        }
        vParent = vParent.parent;
        nParent = nParent.parent;
    }
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = match;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL21hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxlQUE4QixJQUFrQixFQUFFLEtBQWM7SUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFBQyxDQUFDO0lBQ3pDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQixPQUFNLE9BQU8sRUFBRSxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7O0FBVkQsd0JBVUM7QUFBQSxDQUFDIn0=