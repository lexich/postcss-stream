import { Node } from "postcss";

export default class CNode {
    constructor(public updateModel: ((n: Node)=> void), public node?:Node) {

    }
}