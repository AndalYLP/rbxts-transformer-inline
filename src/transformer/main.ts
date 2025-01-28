import ts from "typescript";

import type { TransformContext } from ".";
import { file } from "../symbols/$file";
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
        } else if (ts.isCallExpression(node)) {
            return this.visitCallExpression(node)
        }

        return this.context.transform(node);
    }

    public visitIdentifier(node: ts.Identifier): ts.Node {
        const symbol = this.typeChecker.getSymbolAtLocation(node);
        if (!symbol) return node

        if (!this.symbolUtils.isCorrectImport(symbol)) return node

        return this.symbolUtils.transformSymbol(node)
    }

    public visitPropertyAccessExpression(main: ts.CallExpression, node: ts.PropertyAccessExpression): ts.Node {
        const { factory, config: { CustomLogger: { LogMethods, PackageName } } } = this.context

        if (!LogMethods.includes(node.name.text)) return this.context.transform(main)

        const symbol = this.typeChecker.getTypeAtLocation(node.expression).symbol
        if (!symbol) return main

        if (!this.symbolUtils.isCorrectImport(symbol, PackageName, true)) return this.context.transform(main)

        const argument = main.arguments[0]
        if (!argument) return main

        const fileInfo = file[1](this.context, argument as ts.Identifier) as ts.StringLiteral

        return factory.createCallExpression(main.expression, undefined, [factory.createTemplateExpression(
            factory.createTemplateHead(`${fileInfo.text} `),
            [factory.createTemplateSpan(factory.createIdentifier(argument.getText()), factory.createTemplateTail(""))]
        )])
    }

    public visitCallExpression(node: ts.CallExpression): ts.Node {
        const expression = node.expression

        if (ts.isPropertyAccessExpression(expression)) {
            if (this.context.config.CustomLogger.Enabled)
                return this.visitPropertyAccessExpression(node, expression)
        }

        return this.context.transform(node);
    }

    public visitStatement(node: ts.Statement): ts.Statement {
        if (ts.isImportDeclaration(node)) {
            return visitImportDeclaration(this.context, node)
        }

        return this.context.transform(node);
    }
}