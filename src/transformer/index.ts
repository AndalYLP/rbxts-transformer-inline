import ts from "typescript";

import { SymbolTransformer } from "./main";

/**
 * This is the transformer's configuration, the values are passed from the tsconfig.
 */
export interface TransformerConfig {
	_: void;
}

/**
 * This is a utility object to pass around your dependencies.
 *
 * You can also use this object to store state, e.g prereqs.
 */
export class TransformContext {
	public factory: ts.NodeFactory;

	constructor(
		public program: ts.Program,
		public context: ts.TransformationContext,
		public config: TransformerConfig,
	) {
		this.factory = context.factory;
	}

	/**
	 * Transforms the children of the specified node.
	 */
	transform<T extends ts.Node>(node: T): T {
		return ts.visitEachChild(node, (node) => this.macroTransformer.visit(node), this.context);
	}

	public readonly macroTransformer = new SymbolTransformer(this)
}
