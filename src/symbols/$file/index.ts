import path from "path";
import ts from "typescript";


import type { TransformerType } from "..";
import type { TransformContext } from "../../transformer";
import { formatModifiers } from "./modifiers";

const symbol = "$file"

function transformer(context: TransformContext, node: ts.Identifier): ts.Node {
    const { factory, config } = context
    const source = node.getSourceFile()

    let result: string
    if (config.FileSymbolFormat === undefined) {
        result = path.relative(process.cwd(), source.fileName).replace(/\\/g, "/")
    } else {
        result = formatModifiers.startModify(config.FileSymbolFormat, source, node)
    }

    return factory.createStringLiteral(result)
}

export const file: [string, TransformerType] = [symbol, transformer]
