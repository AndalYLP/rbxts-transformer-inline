import ts from "typescript";

import type { TransformContext } from ".";
import { SymbolUtils } from "../utils/symbol";
import { visitImportDeclaration } from "./import-declaration";

export class SymbolTransformer {
    private readonly typeChecker: ts.TypeChecker
    private readonly symbolUtils: SymbolUtils

    constructor(private readonly context: TransformContext) {
        this.typeChecker = ts.createTypeChecker(context.program)
        this.symbolUtils = new SymbolUtils(context)
    }

    public visit(node: ts.Node): ts.Node {
        if (ts.isStatement(node)) {
            return this.visitStatement(node)
        } else if (ts.isIdentifier(node)) {
            return this.visitIdentifier(node)
        }

        return this.context.transform(node);
    }

    public visitIdentifier(node: ts.Identifier): ts.Node {
        const symbol = this.typeChecker.getSymbolAtLocation(node);
        if (!symbol) return node

        const newNode = this.symbolUtils.isOurImport(symbol)
        if (!newNode) return node

        return this.symbolUtils.transformSymbol(node)
    }

    public visitStatement(node: ts.Statement): ts.Statement {
        if (ts.isImportDeclaration(node)) {
            return visitImportDeclaration(this.context, node);
        }

        return this.context.transform(node);
    }
}