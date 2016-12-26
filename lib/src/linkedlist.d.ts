export declare const NONE: symbol;
export interface LinkedItemList<T> {
    data: T | symbol;
    prev: LinkedItemList<T>;
    next: LinkedItemList<T>;
}
export declare function persist(item: LinkedItemList<any>): void;
export declare function isEmpty<T>(list?: LinkedItemList<T>): boolean;
export declare function init<T>(): LinkedItemList<T>;
export declare function add<T>(data: T, list?: LinkedItemList<T>): LinkedItemList<T>;
export declare function shift<T>(list: LinkedItemList<T>): T;
export declare function pop<T>(list: LinkedItemList<T>): T;
