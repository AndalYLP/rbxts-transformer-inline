import ts from "typescript";

import type { TransformerType } from ".";
import type { TransformContext } from "../transformer";

const symbol = "$column"

function transformer(context: TransformContext, node: ts.Identifier): ts.Node {
    const { factory } = context
    const source = node.getSourceFile()

    const column = source.getLineAndCharacterOfPosition(node.getStart()).character + 1

    return factory.createNumericLiteral(column)
}

export const column: [string, TransformerType] = [symbol, transformer]
