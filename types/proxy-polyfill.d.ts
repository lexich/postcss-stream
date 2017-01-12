declare namespace ProxyNamenspace {
    type PropertyKey = string | number | symbol;

    interface ProxyHandler<T> {
        getPrototypeOf? (target: T): any;
        setPrototypeOf? (target: T, v: any): boolean;
        isExtensible? (target: T): boolean;
        preventExtensions? (target: T): boolean;
        getOwnPropertyDescriptor? (target: T, p: PropertyKey): PropertyDescriptor;
        has? (target: T, p: PropertyKey): boolean;
        get? (target: T, p: PropertyKey, receiver: any): any;
        set? (target: T, p: PropertyKey, value: any, receiver: any): boolean;
        deleteProperty? (target: T, p: PropertyKey): boolean;
        defineProperty? (target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean;
        enumerate? (target: T): PropertyKey[];
        ownKeys? (target: T): PropertyKey[];
        apply? (target: T, thisArg: any, argArray?: any): any;
        construct? (target: T, thisArg: any, argArray?: any): any;
    }
    
    
}

declare class Proxy<T> {
    constructor(target: T, handler: ProxyNamenspace.ProxyHandler<T>);
    revocable<T>(target: T, handler: ProxyNamenspace.ProxyHandler<T>): { proxy: T; revoke: () => void; };
}