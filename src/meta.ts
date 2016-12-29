import { MNode } from "./interface";

export function setMeta<T>(node: MNode, prop: string, val: T): T {
    const meta = node.__meta__ || getMetaObject(node);
    (meta as any)[prop] = val as any;
    return val;
}

export function getMetaObject(node: MNode) {
    if (!node.__meta__) {
        node.__meta__ = { 
            pipe: null, 
            stage: null,
            skip: false,
        };
    }
    return node.__meta__;
}

export function getMeta<T>(node: MNode, prop: string) : T {
    if (node.__meta__) {
        return (node.__meta__ as any)[prop] as T;
    } else {
        return null;
    }
}

export function clearMeta(node: MNode) {
    node.__meta__ = undefined;
}