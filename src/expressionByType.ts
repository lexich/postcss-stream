import { Query } from "./interface";

export default function expressionByType(query: Query, type: string) {
    return type === "decl" ? query.decl :
           type === "rule" ? query.rule : null;
}
