import { MNode } from "./interface";
import { getMeta, setMeta } from "./meta";
import StreamPipe from "./streampipe";



export default function overwrite<T>(child: MNode, pipe: StreamPipe): T | MNode {
    setMeta(child, "pipe", pipe);
    const proxy = getMeta<MNode>(child, "proxy");
    if (proxy) {
        return proxy;
    } else {
        return setMeta<MNode>(child, "proxy", new Proxy<MNode>(child, {
            set(target: MNode, prop: string, value: any, receiver: any) {
                if (target) {
                    (target as any)[prop] = value;
                    const pipe = getMeta<StreamPipe>(child, "pipe");
                    pipe.skipNode(child);                    
                    return true;
               }
               return false;
            },
            get(target: MNode, prop: string) {
                if (!target) {
                    return undefined;
                }                
                const getter = (target as any)[prop];
                if (prop === "parent" && getter) {
                    if (getter instanceof Function) {
                        return getter;
                    } else {
                        return overwrite(getter, getMeta<StreamPipe>(child, "pipe"));
                    }
                } else if (prop === "$$self") {
                    return target;
                } else if (prop === "index") {
                    const key = `__${prop}`;
                    return getMeta<any>(target, key) || 
                           setMeta<any>(target, key, function(proxy: MNode) {
                               const node: MNode = proxy ? (proxy as any).$$self : proxy;
                              return (target as any).index(node);
                           });
                } else {
                    return getter;
                }
            }
        }));
    }
}