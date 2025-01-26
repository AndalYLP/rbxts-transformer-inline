import ts from "typescript";
import { Symbols } from "../symbols";
import { TransformContext } from "../transformer";

export class SymbolUtils {
    private readonly symbols: Symbols

    constructor(private readonly context: TransformContext) {
        this.symbols = new Symbols()
    }

    public transformSymbol(node: ts.Identifier): ts.Node {
        const transformer = this.symbols.getTransformer(node.text)
        if (!transformer) return node

        return transformer(this.context, node)
    }

    public isOurImport(symbol: ts.Symbol): boolean {
        if (!symbol.declarations) return false

        for (const declaration of symbol.declarations) {
            if (!ts.isImportSpecifier(declaration)) continue
            const importDeclaration = declaration.parent.parent.parent;
            if (!ts.isImportDeclaration(importDeclaration)) continue
            const moduleSpecifier = importDeclaration.moduleSpecifier;
            if (!ts.isStringLiteral(moduleSpecifier)) continue
            if (moduleSpecifier.text !== "rbxts-transformer-inline") continue

            return true
        }

        return false
    }
}