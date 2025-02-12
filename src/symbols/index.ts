import ts from "typescript";
import { TransformContext } from "../transformer";
import { column } from "./$column";
import { file } from "./$file";
import { line } from "./$line";

export type TransformerType = (context: TransformContext, node: ts.Identifier) => ts.Node

export class Symbols {
    private readonly symbols: Map<string, TransformerType> = new Map([line, column, file])

    public getTransformer(symbol: string): TransformerType | undefined {
        return this.symbols.get(symbol)
    }
}