import { BuildInfoDictionary } from './validate-upgrade-safety';
import { SourceContract } from './validations';
export declare class ReferenceContractNotFound extends Error {
    /**
     * The contract reference that could not be found.
     */
    readonly reference: string;
    /**
     * The fully qualified name of the contract that referenced the missing contract.
     */
    readonly origin?: string;
    /**
     * Build info directories that were also searched.
     */
    readonly buildInfoDirs?: string[];
    constructor(reference: string, origin?: string, buildInfoDirs?: string[]);
}
export declare function findContract(contractName: string, origin: SourceContract | undefined, buildInfoDictionary: BuildInfoDictionary, onlyMainBuildInfoDir?: boolean): SourceContract;
//# sourceMappingURL=find-contract.d.ts.map