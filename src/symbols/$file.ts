import path from "path";
import ts from "typescript";


import type { TransformerType } from ".";
import type { TransformContext } from "../transformer";

const symbol = "$file"

function transformer(context: TransformContext, node: ts.Identifier): ts.Node {
    const { factory } = context
    const source = node.getSourceFile()

    const formatedPath = path.relative(process.cwd(), source.fileName).replace(/\\/g, "/")

    return factory.createStringLiteral(formatedPath)
}

export const file: [string, TransformerType] = [symbol, transformer]
