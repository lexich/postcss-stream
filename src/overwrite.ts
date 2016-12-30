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
            const ret = insertBefore.call(this, exist, add);
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
            const ret = insertAfter.call(this, exist, add);
            let len = Array.isArray(add) ? add.length : 1;
            let index = this.index(exist);
            while (len) {
                len--;
                index++;
                skipNode(this.nodes[index]);
            }
            return ret;
        };
    }

    const append = proto.append;
    if (append instanceof Function) {
        proto.append = function(...children: any[]) {
            const ret = append.apply(this, children);
            const len = children.length;
            const lenNodes = this.nodes.length;
            for (let i = 0; i < len; i++) {
                skipNode(this.nodes[lenNodes - 1 - i]);
            }
            return ret;
        };
    }
    const prepend = proto.prepend;
    if (prepend instanceof Function) {
        proto.prepend = function(...children: any[]) {
            const ret = prepend.apply(this, children);
            const len = children.length;
            for (let i = 0; i < len; i++) {
                skipNode(this.nodes[i]);
            }
            return ret;
        };
    }

    const clone = proto.clone;
    if (clone instanceof Function) {
        proto.clone = function(overwrite: any) {
            const ret = clone.call(this, overwrite);
            metaService.clone(ret, this);
            return ret;
        };
    }

    const index = proto.index;
    if (index instanceof Function) {
        proto.index = function(node: MNode) {
            const child = (typeof node === "number" || node instanceof Number) ? 
                            node : metaService.get(node).self;
            return index.call(this, child);
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
                } else {
                    return getter;
                }
            }
        });
    }
}