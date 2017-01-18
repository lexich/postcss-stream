"use strict";
exports.NONE = typeof Symbol === "function" ? Symbol.for("NONE") : {};
let removedItems = { data: null, prev: null, next: null };
function persist(item) {
    item.next = removedItems;
    item.prev = null;
    item.data = null;
    removedItems = item;
}
exports.persist = persist;
function isEmpty(list) {
    if (!list) {
        return true;
    }
    else {
        return list.prev === list.next && list.prev === list;
    }
}
exports.isEmpty = isEmpty;
function init() {
    const list = { data: exports.NONE, next: null, prev: null };
    list.next = list;
    list.prev = list;
    return list;
}
exports.init = init;
function add(data, list) {
    if (!list) {
        list = init();
    }
    if (data === exports.NONE) {
        return list;
    }
    let item;
    const last = list.prev;
    if (!removedItems.next) {
        item = {
            data: data,
            prev: last,
            next: list
        };
    }
    else {
        item = removedItems;
        removedItems = removedItems.next;
        item.data = data;
        item.prev = last;
        item.next = list;
    }
    last.next = item;
    list.prev = item;
    return list;
}
exports.add = add;
function shift(list) {
    if (list.prev === list.next && list.prev === list) {
        return null;
    }
    else {
        const first = list.next;
        const second = first.next;
        list.next = second;
        second.prev = list;
        const data = first.data;
        persist(first);
        return data === exports.NONE ? null : data;
    }
}
exports.shift = shift;
function pop(list) {
    if (list.prev === list.next && list.prev === list) {
        return null;
    }
    else {
        const first = list.prev;
        const second = first.prev;
        list.prev = second;
        second.next = list;
        const data = first.data;
        persist(first);
        return data === exports.NONE ? null : data;
    }
}
exports.pop = pop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkbGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvbGlua2VkbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQWEsUUFBQSxJQUFJLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUksRUFBYSxDQUFDO0FBUXZGLElBQUksWUFBWSxHQUF3QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFFL0UsaUJBQXdCLElBQXlCO0lBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDeEIsQ0FBQztBQUxELDBCQUtDO0FBRUQsaUJBQTJCLElBQXdCO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUN6RCxDQUFDO0FBQ0wsQ0FBQztBQU5ELDBCQU1DO0FBRUQ7SUFDSSxNQUFNLElBQUksR0FBc0IsRUFBRSxJQUFJLEVBQUUsWUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7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