import { MNode } from "./interface";
import metaService from "./meta";
import StreamPipe from "./streampipe";


function skipNode(node: MNode) {
    if (!node) { return; }
    const { pipe } = metaService.get(node);
    if (pipe) {
        pipe.skipNode(node);
    }
}

function patchProto(classObj: any) {
    const proto = classObj.prototype;
    const insertBefore = proto.insertBefore;
    if (insertBefore instanceof Function) {
        proto.insertBefore = function(exist: any, add: any) {
            const ret = insertBefore.call(metaService.get(this).self, exist, add);
            let len = Array.isArray(add) ? add.length : 1;
            let index = this.index(exist);
            while (len) {
                len--;
                index--;                
                skipNode(this.nodes[index]);
            }
            return ret;
        };
    }
    
    const insertAfter = proto.insertAfter;
    if (insertAfter instanceof Function) {
        proto.insertAfter = function(exist: any, add: any) {
            const self: any = metaService.get(this).self;
            const ret = insertAfter.call(self, exist, add);
            let len = Array.isArray(add) ? add.length : 1;
            let index = self.index(exist);
            while (len) {
                len--;
                index++;
                skipNode(self.nodes[index]);
            }
            return ret;
        };
    }

    const append = proto.append;
    if (append instanceof Function) {
        proto.append = function(...children: any[]) {
            const self: any = metaService.get(this).self;
            const ret = append.apply(self, children);
            const len = children.length;
            const lenNodes = self.nodes.length;
            for (let i = 0; i < len; i++) {
                skipNode(self.nodes[lenNodes - 1 - i]);
            }
            return ret;
        };
    }
    const prepend = proto.prepend;
    if (prepend instanceof Function) {
        proto.prepend = function(...children: any[]) {
            const self: any = metaService.get(this).self;
            const ret = prepend.apply(self, children);
            const len = children.length;
            for (let i = 0; i < len; i++) {
                skipNode(self.nodes[i]);
            }
            return ret;
        };
    }

    const clone = proto.clone;
    if (clone instanceof Function) {
        proto.clone = function(overwrite: any) {
            const self: any = metaService.get(this).self;
            const ret = clone.call(self, overwrite);
            metaService.clone(ret, self);
            return ret;
        };
    }

    const index = proto.index;
    if (index instanceof Function) {
        proto.index = function(node: MNode| number) {
            const child = (typeof node === "number" || node instanceof Number) ? 
                            node : metaService.get(node).self;
            const self: any = metaService.get(this).self;
            return index.call(self, child);
        };
    }
    const removeChild = proto.removeChild;
    if (removeChild instanceof Function) {
        proto.removeChild = function(child: MNode | number) {
            let node: number | MNode;
            if (typeof child === "number" || child instanceof Number) {
                node = child;
            } else {                
                const meta = metaService.get(child as MNode);
                meta.remove = true;
                node = meta.self;                
            }
            const self: any = metaService.get(this).self;
            removeChild.call(self, node);
        };
    }
}


[
    require("postcss/lib/declaration"),
    require("postcss/lib/rule"),
    require("postcss/lib/root"),
    require("postcss/lib/at-rule"),
    require("postcss/lib/comment"),
    require("postcss/lib/node"),
    require("postcss/lib/container")
].forEach(patchProto);


export default function overwrite<T>(child: MNode, pipe: StreamPipe): T | MNode {
    const meta = metaService.get(child);
    meta.pipe = pipe;
    
    if (meta.proxy) {
        return meta.proxy;
    } else {
        return meta.proxy = new Proxy<MNode>(child, {
            set(target: MNode, prop: string, value: any, receiver: any) {
                if (target) {
                    (target as any)[prop] = value;
                    const { pipe } =  metaService.get(child);
                    if (pipe) {
                        pipe.skipNode(child);
                    }
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
                        return overwrite(getter, metaService.get(child).pipe);
                    }
                } else if (prop === "nodes") {
                    const meta = metaService.get(target);
                    if (!meta.proxyNodes) {
                        meta.proxyNodes = new Proxy<MNode[]>(getter, {
                            set(target: MNode[], prop: string, value: any, receiver: any) {
                                const node = metaService.get(value as MNode).self;
                                skipNode(node);
                                target[(prop as any) as number] = node;
                            },
                            get(target: MNode[], prop: string) {
                                if (prop === "indexOf" || prop === "length") {
                                    return target[prop];
                                }
                                const item = target[(prop as any) as number];
                                if (item instanceof Function) {
                                    return item;
                                }
                                if (item === null || item === undefined)  {
                                    return item;
                                }
                                if (typeof item === "number" || item instanceof Number) {
                                    return item;
                                }
                                return overwrite(item, pipe);
                            }
                        });
                    }
                    return meta.proxyNodes;
                
                } else {
                    return getter;
                }
            }
        });
    }
}