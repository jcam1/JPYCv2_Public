import { StorageLayout } from './layout';
import { SrcDecoder } from '../src-decoder';
import { Node } from 'solidity-ast/node';
import { CompilationContext } from './extract';
/**
 * Loads a contract's namespaces and namespaced type information into the storage layout.
 *
 * The provided compilation contexts must include both the original compilation and optionally
 * a namespaced compilation where contracts have been modified to include namespaced type information.
 *
 * If namespaced compilation is included, storage slots and offsets will be included in the loaded namespaces and types.
 *
 * This function looks up namespaces and their members from the namespaced compilation context's AST if available
 * (meaning node ids would be from the namespaced compilation), and looks up slots and offsets from the compiled type information.
 * However, it saves the original source locations from the original context so that line numbers are
 * consistent with the original source code.
 *
 * @param decodeSrc Source decoder for the original source code.
 * @param layout The storage layout object to load namespaces into.
 * @param origContext The original compilation context, which is used to lookup original source locations.
 * @param namespacedContext The namespaced compilation context, which represents a namespaced compilation.
 */
export declare function loadNamespaces(decodeSrc: SrcDecoder, layout: StorageLayout, origContext: CompilationContext, namespacedContext?: CompilationContext): void;
/**
 * Gets the storage location string from the `@custom:storage-location` annotation.
 *
 * For example, when using ERC-7201 (https://eips.ethereum.org/EIPS/eip-7201), the result will be `erc7201:<NAMESPACE_ID>`
 *
 * @param node The node that may have a `@custom:storage-location` annotation.
 * @returns The storage location string, or undefined if the node does not have a `@custom:storage-location` annotation.
 * @throws Error if the node has the annotation `@custom:storage-location` but it does not have exactly one argument.
 */
export declare function getStorageLocationAnnotation(node: Node): string | undefined;
export declare function isNamespaceSupported(solcVersion: string): boolean;
//# sourceMappingURL=namespace.d.ts.map