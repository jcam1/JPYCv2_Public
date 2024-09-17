import { Cost, Operation } from '../levenshtein';
import { ParsedTypeDetailed } from './layout';
import { StorageItem as _StorageItem, StructMember as _StructMember, StorageField as _StorageField } from './layout';
import { LayoutCompatibilityReport } from './report';
export type StorageItem = _StorageItem<ParsedTypeDetailed>;
type StructMember = _StructMember<ParsedTypeDetailed>;
export type StorageField = _StorageField<ParsedTypeDetailed>;
export type StorageOperation<F extends StorageField> = Operation<F, StorageFieldChange<F>>;
export type EnumOperation = Operation<string, {
    kind: 'replace';
    original: string;
    updated: string;
}>;
type StorageFieldChange<F extends StorageField> = ({
    kind: 'replace' | 'rename' | 'finishgap';
} | {
    kind: 'typechange';
    change: TypeChange;
} | {
    kind: 'layoutchange';
    change: LayoutChange;
} | {
    kind: 'shrinkgap';
    change: TypeChange;
}) & {
    original: F;
    updated: F;
} & Cost;
export type TypeChange = ({
    kind: 'obvious mismatch' | 'unknown' | 'array grow' | 'visibility change' | 'array shrink' | 'array dynamic' | 'type resize' | 'missing members';
} | {
    kind: 'mapping key' | 'mapping value' | 'array value';
    inner: TypeChange;
} | {
    kind: 'enum members';
    ops: EnumOperation[];
} | {
    kind: 'struct members';
    ops: StorageOperation<StructMember>[];
    allowAppend: boolean;
}) & {
    original: ParsedTypeDetailed;
    updated: ParsedTypeDetailed;
};
export interface LayoutChange {
    uncertain?: boolean;
    knownCompatible?: boolean;
    slot?: Record<'from' | 'to', string>;
    offset?: Record<'from' | 'to', number>;
    bytes?: Record<'from' | 'to', string>;
}
/**
 * Gets the storage field's begin position as the number of bytes from 0.
 *
 * @param field the storage field
 * @returns the begin position, or undefined if the slot or offset is undefined
 */
export declare function storageFieldBegin(field: StorageField): bigint | undefined;
/**
 * Gets the storage field's end position as the number of bytes from 0.
 *
 * @param field the storage field
 * @returns the end position, or undefined if the slot or offset or number of bytes is undefined
 */
export declare function storageFieldEnd(field: StorageField): bigint | undefined;
export declare class StorageLayoutComparator {
    readonly unsafeAllowCustomTypes: boolean;
    readonly unsafeAllowRenames: boolean;
    hasAllowedUncheckedCustomTypes: boolean;
    stack: Set<string>;
    cache: Map<string, TypeChange | undefined>;
    constructor(unsafeAllowCustomTypes?: boolean, unsafeAllowRenames?: boolean);
    compareLayouts(original: StorageItem[], updated: StorageItem[], originalNamespaces?: Record<string, StorageItem[]>, updatedNamespaces?: Record<string, StorageItem[]>): LayoutCompatibilityReport;
    private getNamespacedStorageOperations;
    private layoutLevenshtein;
    getVisibilityChange(original: ParsedTypeDetailed, updated: ParsedTypeDetailed): TypeChange | undefined;
    getFieldChange<F extends StorageField>(original: F, updated: F): StorageFieldChange<F> | undefined;
    private isRetypedFromOriginal;
    getLayoutChange(original: StorageField, updated: StorageField): LayoutChange | undefined;
    getTypeChange(original: ParsedTypeDetailed, updated: ParsedTypeDetailed, { allowAppend }: {
        allowAppend: boolean;
    }): TypeChange | undefined;
    private uncachedGetTypeChange;
}
export declare function stripContractSubstrings(label?: string): string | undefined;
export {};
//# sourceMappingURL=compare.d.ts.map