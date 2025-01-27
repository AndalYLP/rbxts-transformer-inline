import path from "path"
import ts from "typescript"

const modifier = "%main"

export function mainModifier(toFormat: string, source: ts.SourceFile, node: ts.Node): string {
    if (!toFormat.includes(modifier)) return toFormat

    const formatedPath = path.relative(process.cwd(), source.fileName).replace(/\\/g, "/")

    return toFormat.replace(modifier, formatedPath)
}