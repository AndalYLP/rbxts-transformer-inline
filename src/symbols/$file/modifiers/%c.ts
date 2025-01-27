import ts from "typescript"

const modifier = "%c"

export function columnModifier(toFormat: string, source: ts.SourceFile, node: ts.Node): string {
    if (!toFormat.includes(modifier)) return toFormat

    const column = source.getLineAndCharacterOfPosition(node.getStart()).character + 1

    return toFormat.replace(modifier, column.toString())
}
