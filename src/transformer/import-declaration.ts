import ts from "typescript";

import type { TransformContext } from ".";

export function visitImportDeclaration(context: TransformContext, node: ts.ImportDeclaration) {
    const { factory } = context;

    const path = node.moduleSpecifier;
    const clause = node.importClause;
    if (!clause) return node;
    if (!ts.isStringLiteral(path)) return node;
    if (path.text !== "rbxts-transformer-inline") return node;

    const namedBindings = clause.namedBindings;
    if (!namedBindings) return node;
    if (!ts.isNamedImports(namedBindings)) return node;

    return factory.updateImportDeclaration(
        node,
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports([])),
        node.moduleSpecifier,
        undefined,
    )
}