import { StreamDeclaration, QDeclaration, StreamRule, QRule, Stream, Query } from "./interface";
export declare function processDecl(decl: StreamDeclaration): QDeclaration[];
export declare function processRule(rule: StreamRule): QRule[];
export default function processQuery(stream: Stream, streamQuery: Query): Query;
