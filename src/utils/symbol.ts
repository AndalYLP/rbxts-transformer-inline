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

    public isCorrectImport(symbol: ts.Symbol, correctImport: string = "rbxts-transformer-inline"): boolean {
        if (!symbol.declarations) throw new Error("FATAL 1 LOCO")

        for (let declaration of symbol.declarations) {
            const isImportSpecifier = ts.isImportSpecifier(declaration)
            if (!isImportSpecifier && !ts.isImportDeclaration(declaration.parent)) continue
            const importDeclaration = isImportSpecifier ? declaration.parent.parent.parent : declaration.parent;
            if (!ts.isImportDeclaration(importDeclaration)) continue
            const moduleSpecifier = importDeclaration.moduleSpecifier;
            if (!ts.isStringLiteral(moduleSpecifier)) continue
            if (moduleSpecifier.text !== correctImport) continue

            return true
        }

        return false
    }
}