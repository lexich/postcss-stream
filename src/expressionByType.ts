import { Query, QueryExpression } from "./interface";
import {LinkedItemList} from "./linkedlist";

export default function expressionByType(query: Query, type: string): LinkedItemList<QueryExpression> | null {
    return type === "decl" ? query.decl :
           type === "rule" ? query.rule : null;
}
