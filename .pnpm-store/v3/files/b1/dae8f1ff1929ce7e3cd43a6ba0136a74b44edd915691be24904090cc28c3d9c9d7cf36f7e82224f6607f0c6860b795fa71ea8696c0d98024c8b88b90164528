import { Version } from '../version';
import { ValidationRunData, ValidationError, ContractValidation } from './run';
import { StorageLayout } from '../storage/layout';
import { ValidationOptions } from './overrides';
import { ValidationData } from './data';
import { ProxyDeployment } from '../manifest';
export declare function assertUpgradeSafe(data: ValidationData, version: Version, opts: ValidationOptions): void;
/**
 * Gets the contract version object from the given validation run data and contract name (either fully qualified or simple contract name).
 *
 * @param runData The validation run data
 * @param contractName Fully qualified or simple contract name
 * @returns contract version object
 * @throws {Error} if the given contract name is not found or is ambiguous
 */
export declare function getContractVersion(runData: ValidationRunData, contractName: string): Version;
/**
 * Gets the fully qualified contract name and validation run data.
 *
 * @param data The validation data
 * @param version The contract Version
 * @returns fully qualified contract name and validation run data
 */
export declare function getContractNameAndRunValidation(data: ValidationData, version: Version): [string, ValidationRunData];
export declare function getStorageLayout(data: ValidationData, version: Version): StorageLayout;
export declare function unfoldStorageLayout(runData: ValidationRunData, fullContractName: string): StorageLayout;
export declare function findVersionWithoutMetadataMatches(data: ValidationData, versionWithoutMetadata: string): Generator<[string, ValidationRunData]>;
export declare function getUnlinkedBytecode(data: ValidationData, bytecode: string): string;
export declare function getErrors(data: ValidationData, version: Version, opts?: ValidationOptions): ValidationError[];
export declare function isUpgradeSafe(data: ValidationData, version: Version): boolean;
export declare function inferUUPS(runValidation: ValidationRunData, fullContractName: string): boolean;
export declare function inferProxyKind(data: ValidationData, version: Version): ProxyDeployment['kind'];
/**
 * Whether the contract inherits any contract named "Initializable"
 * @param contractValidation The validation result for the contract
 * @return true if the contract inheritss any contract whose fully qualified name ends with ":Initializable"
 */
export declare function inferInitializable(contractValidation: ContractValidation): boolean;
//# sourceMappingURL=query.d.ts.map