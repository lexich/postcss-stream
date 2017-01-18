"use strict";
const compileMatcher_1 = require("./compileMatcher");
const ATTRS = ['decl', 'rule', 'atrule', 'comment', 'root'];
function compile(query, iter, parent, container) {
    if (!query) {
        return null;
    }
    let anyQuery;
    if (!container) {
        container = { enter: [], leave: [] };
    }
    for (let type of ATTRS) {
        anyQuery = query[type];
        if (anyQuery) {
            const match = compileMatcher_1.default(query, type);
            const visitEnter = {
                type, match, parent,
                ref: iter.val,
                fn: anyQuery.enter,
            };
            iter.val += 1;
            if (visitEnter.fn) {
                container.enter[container.enter.length] = visitEnter;
            }
            compile(anyQuery, iter, visitEnter, container);
            if (anyQuery.leave) {
                container.leave[container.leave.length] = {
                    type, match, parent,
                    ref: iter.val,
                    fn: anyQuery.leave,
                };
            }
            iter.val += 1;
        }
    }
    return container;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvY29tcGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscURBQThDO0FBRzlDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVELGlCQUFnQyxLQUFZLEVBQUUsSUFBbUIsRUFBRSxNQUFlLEVBQUUsU0FBNEI7SUFDNUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUFDLENBQUM7SUFDNUIsSUFBSSxRQUFhLENBQUM7SUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2IsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsUUFBUSxHQUFJLEtBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxLQUFLLEdBQUcsd0JBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsTUFBTSxVQUFVLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNO2dCQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLO2FBQ3JCLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQ3pELENBQUM7WUFDRCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBSTtvQkFDdkMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNO29CQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLO2lCQUNyQixDQUFDO1lBQ04sQ0FBQztZQUNELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQixDQUFDOztBQS9CRCwwQkErQkMifQ==