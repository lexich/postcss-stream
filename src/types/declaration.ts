import CNode from "./node";
import {Declaration} from "postcss";

export default class CDeclaration extends CNode {
    set value(value: string) {
        this.updateModel(this.node);
        (this.node as Declaration).value = value;        
    }
    get value() {
        return (this.node as Declaration).value;
    }
}

