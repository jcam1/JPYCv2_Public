import { ManifestData } from '../manifest';
export declare function migrateLegacyProject(): Promise<void>;
export declare function migrateManifestFiles(manifestFiles: string[]): Promise<Record<string, NetworkExportData>>;
export declare function deleteLegacyFiles(manifestFiles: string[]): Promise<void>;
export declare function migrateManifestsData(manifestsData: Record<string, NetworkFileData>): MigrationOutput;
type NetworkExportData = Pick<NetworkFileData, 'proxies' | 'proxyFactory' | 'app' | 'package' | 'provider'>;
export interface MigrationOutput {
    newManifestsData: Record<string, ManifestData>;
    networksExportData: Record<string, NetworkExportData>;
}
interface ContractInterface {
    address?: string;
    constructorCode?: string;
    localBytecodeHash?: string;
    deployedBytecodeHash?: string;
    bodyBytecodeHash?: string;
    types?: any;
    storage?: any;
    warnings?: any;
    [id: string]: any;
}
interface SolidityLibInterface {
    address: string;
    constructorCode: string;
    bodyBytecodeHash: string;
    localBytecodeHash: string;
    deployedBytecodeHash: string;
}
declare enum ProxyType {
    Upgradeable = "Upgradeable",
    Minimal = "Minimal",
    NonProxy = "NonProxy"
}
interface ProxyInterface {
    contractName?: string;
    package?: string;
    address?: string;
    version?: string;
    implementation?: string;
    admin?: string;
    kind?: ProxyType;
    bytecodeHash?: string;
}
interface DependencyInterface {
    name?: string;
    package?: string;
    version?: string;
    customDeploy?: boolean;
}
interface AddressWrapper {
    address?: string;
}
export interface NetworkFileData {
    contracts: {
        [name: string]: ContractInterface;
    };
    solidityLibs: {
        [name: string]: SolidityLibInterface;
    };
    proxies: {
        [contractName: string]: ProxyInterface[];
    };
    manifestVersion?: string;
    zosversion?: string;
    proxyAdmin: AddressWrapper;
    proxyFactory: AddressWrapper;
    app: AddressWrapper;
    package: AddressWrapper;
    provider: AddressWrapper;
    version: string;
    frozen: boolean;
    dependencies: {
        [dependencyName: string]: DependencyInterface;
    };
}
interface ConfigFileCompilerOptions {
    manager: string;
    solcVersion: string;
    contractsDir: string;
    artifactsDir: string;
    compilerSettings: {
        evmVersion: string;
        optimizer: {
            enabled: boolean;
            runs?: string;
        };
    };
    typechain: {
        enabled: boolean;
        outDir?: string;
        target?: string;
    };
}
export interface ProjectFileData {
    name: string;
    version: string;
    manifestVersion?: string;
    zosversion?: string;
    dependencies: {
        [name: string]: string;
    };
    contracts: string[];
    publish: boolean;
    compiler: Partial<ConfigFileCompilerOptions>;
    telemetryOptIn?: boolean;
}
export {};
//# sourceMappingURL=migrate-oz-cli-project.d.ts.map