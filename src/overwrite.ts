import { MNode } from "./interface";
import { sendNodeNext } from "./match";
import { getMeta, setMeta } from "./meta";

export default function overwrite(child: MNode): MNode {
    const proxy = getMeta<MNode>(child, "proxy");
    if (proxy) {
        return proxy;
    } else {
        return setMeta<MNode>(child, "proxy", new Proxy<MNode>(child, {
            set(target: MNode, prop: string, value: any, receiver: any) {
                if (target) {
                    (target as any)[prop] = value;
                    sendNodeNext(target);
                    return true;
               }
               return false;
            },
            get(target: MNode, prop: string) {
                if (!target) {
                    return undefined;
                }
                if (prop === "$$self") {
                    return target;
                }
                const getter = (target as any)[prop];
                if (prop === "parent" && getter) {
                    return overwrite(getter);
                } else if (prop === "index" && getter) {
                    return function(proxy: MNode) {
                        return (target as any).index((proxy as any).$$self as MNode);
                    };
                } else {
                    return getter;
                }
            }
        }));
    }
}