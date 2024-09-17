import { ContractDefinition, StructDefinition, EnumDefinition, VariableDeclaration, TypeName } from 'solidity-ast';
import { ASTDereferencer } from 'solidity-ast/utils';
import { StorageLayout, StructMember, EnumMember } from './layout';
import { SrcDecoder } from '../src-decoder';
export declare function isCurrentLayoutVersion(layout: StorageLayout): boolean;
export interface CompilationContext {
    deref: ASTDereferencer;
    contractDef: ContractDefinition;
    storageLayout?: StorageLayout;
}
export declare function extractStorageLayout(contractDef: ContractDefinition, decodeSrc: SrcDecoder, deref: ASTDereferencer, storageLayout?: StorageLayout, namespacedContext?: CompilationContext): StorageLayout;
type GotTypeMembers<D extends EnumDefinition | StructDefinition, F extends 'src' | 'typeName'> = D extends EnumDefinition ? EnumMember[] : (StructMember & Pick<VariableDeclaration, F>)[];
export declare function getTypeMembers<D extends EnumDefinition | StructDefinition>(typeDef: D): GotTypeMembers<D, never>;
export declare function getTypeMembers<D extends EnumDefinition | StructDefinition, F extends 'src' | 'typeName'>(typeDef: D, includeFields: {
    [f in F]: true;
}): GotTypeMembers<D, F>;
export declare function loadLayoutType(typeName: TypeName | null | undefined, layout: StorageLayout, deref: ASTDereferencer): void;
export {};
//# sourceMappingURL=extract.d.ts.map