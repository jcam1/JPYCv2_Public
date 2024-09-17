import { ExtendedNodeType } from '../utils/is-node-type';
import type { ASTDereferencer } from '../utils';
import type { SolcOutput } from '../solc';
export declare function astDereferencer(solcOutput: SolcOutput): ASTDereferencer;
export interface Curried<A, B, T> {
    (a: A): (b: B) => T;
    (a: A, b: B): T;
}
export declare function curry2<A, B, T>(fn: (a: A, b: B) => T): Curried<A, B, T>;
export declare class ASTDereferencerError extends Error {
    readonly id: number;
    readonly nodeType: readonly ExtendedNodeType[];
    constructor(id: number, nodeType: readonly ExtendedNodeType[]);
}
//# sourceMappingURL=ast-dereferencer.d.ts.map