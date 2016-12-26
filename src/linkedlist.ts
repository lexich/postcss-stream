export const NONE = typeof Symbol === "function" ? Symbol.for("NONE") : ({} as symbol);

export interface LinkedItemList<T> {
    data: T | symbol;
    prev: LinkedItemList<T>;
    next: LinkedItemList<T>;
}

let removedItems: LinkedItemList<any> = { data: null, prev: null, next: null };

export function persist(item: LinkedItemList<any>) {
    item.next = removedItems;
    item.prev = null;
    item.data = null;
    removedItems = item;
}

export function isEmpty<T>(list?: LinkedItemList<T>): boolean {
    if (!list) { 
        return true;
    } else {
        return list.prev === list.next && list.prev === list;
    }
}

export function init<T>() : LinkedItemList<T> {
    const list: LinkedItemList<T> = { data: NONE, next: null, prev: null };
    list.next = list;
    list.prev = list;
    return list;
}

/**
 * add item to tail of list
 */
export function add<T>(data: T, list?: LinkedItemList<T>) : LinkedItemList<T> {
    if (!list) {
        list = init<T>();
    }
    if ((data as any) as symbol  === NONE) {
        return list;
    }
    // create new item or peek from existing
    let item: LinkedItemList<T>;
    const last = list.prev;
    if (!removedItems.next) {
        item = { 
            data: data, 
            prev: last, 
            next: list 
        };
    } else {
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

export function shift<T>(list: LinkedItemList<T>): T {
    if (list.prev === list.next && list.prev === list) { // isEmpty
        return null;
    } else {
        const first = list.next;
        const second = first.next;
        // (list -> first) (list <- first -> second)
        // (list -> second) (list <- first -> second)
        list.next = second;
        // (list -> second) (list <- second)
        second.prev = list;
        const data = first.data;
        persist(first);
        return data === NONE ? null : data as T;
    }
}

export function pop<T>(list: LinkedItemList<T>): T {
    if (list.prev === list.next && list.prev === list) { // isEmpty
        return null;
    } else {
        const first = list.prev;
        const second = first.prev;
        // (second -> first -> list) (first <- list)
        // (second -> first -> list) (second <- list)
        list.prev = second;
        // (second -> list) (second <- list)
        second.next = list;
        const data = first.data;
        persist(first);
        return data === NONE ? null : data as T;
    }
}

