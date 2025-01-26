import ts from "typescript";

import type { TransformerType } from ".";
import type { TransformContext } from "../transformer";

const symbol = "$line"

function transformer(context: TransformContext, node: ts.Identifier): ts.Node {
    const { factory } = context
    const source = node.getSourceFile()

    const line = source.getLineAndCharacterOfPosition(node.getStart()).line + 1

    return factory.createNumericLiteral(line)
}

export const line: [string, TransformerType] = [symbol, transformer]