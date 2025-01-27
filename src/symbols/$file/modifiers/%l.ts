import ts from "typescript"

const modifier = "%l"

export function lineModifier(toFormat: string, source: ts.SourceFile, node: ts.Node): string {
    if (!toFormat.includes(modifier)) return toFormat

    const line = source.getLineAndCharacterOfPosition(node.getStart()).line + 1

    return toFormat.replace(modifier, line.toString())
}
