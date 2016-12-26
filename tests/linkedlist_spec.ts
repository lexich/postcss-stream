import {add, shift, pop, isEmpty, init, NONE} from "../src/linkedlist";
import test from "ava";

test("check correct of list structure", t => {
    const list = add(1);
    t.is(list.next, list.prev);
    t.not(list.next, list);
    t.is(list.data, NONE);

    add(2, list);
    t.is(list.data, NONE);
    t.is(list.next.data, 1);
    t.is(list.next.next.data, 2);
    t.is(list.next.next.next.data, NONE);
    t.is(list.prev.prev.prev.data, NONE);
    t.is(list.prev.prev.data, 1);
    t.is(list.prev.data, 2);
    
    add(3, list);
    t.is(list.data, NONE);
    t.is(list.next.data, 1);
    t.is(list.next.next.data, 2);
    t.is(list.next.next.next.data, 3);
    t.is(list.next.next.next.next.data, NONE);
    t.is(list.prev.prev.prev.prev.data, NONE);
    t.is(list.prev.prev.prev.data, 1);
    t.is(list.prev.prev.data, 2);
    t.is(list.prev.data, 3);
});

test("check shift for list", t => {
    const list = add(1);
    add(2, list);
    add(3, list);
    
    t.is(shift(list), 1);
    t.is(shift(list), 2);
    t.is(shift(list), 3);
    t.is(shift(list), null);
    t.is(shift(list), null);
});

test("check pop for list", t => {
    const list = add(1);
    add(2, list);
    add(3, list);
    
    t.is(pop(list), 3);
    t.is(pop(list), 2);
    t.is(pop(list), 1);
    t.is(pop(list), null);
    t.is(pop(list), null);
});

test("check init and isEmpty", t => {
    const list = init<number>();
    t.true(isEmpty(list));
    add(1, list);
    t.false(isEmpty(list));
    pop(list);
    t.true(isEmpty(list));
});