import { EthereumProvider } from './provider';
import type { Deployment, RemoteDeploymentId } from './deployment';
import type { StorageLayout } from './storage';
export interface ManifestData {
    manifestVersion: string;
    impls: {
        [version in string]?: ImplDeployment & RemoteDeploymentId;
    };
    proxies: (ProxyDeployment & RemoteDeploymentId)[];
    admin?: Deployment;
}
export interface ImplDeployment extends Deployment {
    layout: StorageLayout;
    allAddresses?: string[];
}
export interface ProxyDeployment extends Deployment {
    kind: 'uups' | 'transparent' | 'beacon';
}
interface DevInstanceMetadata {
    networkName: string;
    instanceId: string;
    forkedNetwork?: {
        chainId: number;
    } | null;
}
export declare class Manifest {
    readonly chainId: number;
    readonly file: string;
    readonly fallbackFile: string;
    private readonly dir;
    private readonly chainIdSuffix;
    private readonly parent?;
    private locked;
    static forNetwork(provider: EthereumProvider): Promise<Manifest>;
    constructor(chainId: number, devInstanceMetadata?: DevInstanceMetadata, osTmpDir?: string);
    getAdmin(): Promise<Deployment | undefined>;
    getDeploymentFromAddress(address: string): Promise<ImplDeployment>;
    getProxyFromAddress(address: string): Promise<ProxyDeployment>;
    addProxy(proxy: ProxyDeployment): Promise<void>;
    private exists;
    private readFile;
    private writeFile;
    private moveFileIfRequired;
    read(retries?: number): Promise<ManifestData>;
    write(data: ManifestData): Promise<void>;
    lockedRun<T>(cb: () => Promise<T>): Promise<T>;
    private lock;
}
export declare function migrateManifest(data: ManifestData): ManifestData;
export declare class DeploymentNotFound extends Error {
}
export declare function normalizeManifestData(input: ManifestData): ManifestData;
export {};
//# sourceMappingURL=manifest.d.ts.map