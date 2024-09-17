import { SolcOutput, SolcInput } from '../solc-api';
import { SrcDecoder } from '../src-decoder';
import { Version } from '../version';
import { LinkReference } from '../link-refs';
import { StorageLayout } from '../storage/layout';
export type ValidationRunData = Record<string, ContractValidation>;
export interface ContractValidation {
    version?: Version;
    src: string;
    inherit: string[];
    libraries: string[];
    methods: string[];
    linkReferences: LinkReference[];
    errors: ValidationError[];
    layout: StorageLayout;
    solcVersion?: string;
}
export declare const errorKinds: readonly ["state-variable-assignment", "state-variable-immutable", "external-library-linking", "struct-definition", "enum-definition", "constructor", "delegatecall", "selfdestruct", "missing-public-upgradeto", "internal-function-storage"];
export type ValidationError = ValidationErrorConstructor | ValidationErrorOpcode | ValidationErrorWithName | ValidationErrorUpgradeability;
interface ValidationErrorBase {
    src: string;
    kind: (typeof errorKinds)[number];
}
interface ValidationErrorWithName extends ValidationErrorBase {
    name: string;
    kind: 'state-variable-assignment' | 'state-variable-immutable' | 'external-library-linking' | 'struct-definition' | 'enum-definition' | 'internal-function-storage';
}
interface ValidationErrorConstructor extends ValidationErrorBase {
    kind: 'constructor';
    contract: string;
}
interface ValidationErrorOpcode extends ValidationErrorBase {
    kind: 'delegatecall' | 'selfdestruct';
}
export declare function isOpcodeError(error: ValidationErrorBase): error is ValidationErrorOpcode;
interface ValidationErrorUpgradeability extends ValidationErrorBase {
    kind: 'missing-public-upgradeto';
}
export declare function getAnnotationArgs(doc: string, tag: string): string[];
/**
 * Runs validations on the given solc output.
 *
 * If `namespacedOutput` is provided, it is used to extract storage layout information for namespaced types.
 * It must be from a compilation with the same sources as `solcInput` and `solcOutput`, but with storage variables
 * injected for each namespaced struct so that the types are available in the storage layout. This can be obtained by
 * calling the `makeNamespacedInput` function from this package to create modified solc input, then compiling
 * that modified solc input to get the namespaced output.
 *
 * @param solcOutput Solc output to validate
 * @param decodeSrc Source decoder for the original source code
 * @param solcVersion The version of solc used to compile the contracts
 * @param solcInput Solc input that the compiler was invoked with
 * @param namespacedOutput Namespaced solc output to extract storage layout information for namespaced types
 * @returns A record of validation results for each fully qualified contract name
 */
export declare function validate(solcOutput: SolcOutput, decodeSrc: SrcDecoder, solcVersion?: string, solcInput?: SolcInput, namespacedOutput?: SolcOutput): ValidationRunData;
export {};
//# sourceMappingURL=run.d.ts.map