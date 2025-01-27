import ts from "typescript";
import { columnModifier } from "./%c";
import { lineModifier } from "./%l";
import { mainModifier } from "./%main";

export const formatModifiers = {
    modifiers: [mainModifier, columnModifier, lineModifier],

    startModify(toModify: string, source: ts.SourceFile, node: ts.Node): string {
        let result = toModify
        for (const modifier of this.modifiers) {
            result = modifier(result, source, node)
        }

        return result
    }
}