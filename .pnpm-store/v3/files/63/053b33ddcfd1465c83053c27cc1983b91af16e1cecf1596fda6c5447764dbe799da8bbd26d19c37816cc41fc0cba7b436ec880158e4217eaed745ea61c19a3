import { EthereumProvider } from './provider';
import { ValidationData, ValidationOptions } from './validate';
import { ProxyDeployment } from './manifest';
import { Version } from './version';
export declare function setProxyKind(provider: EthereumProvider, proxyAddress: string, opts: ValidationOptions): Promise<ProxyDeployment['kind']>;
/**
 * Processes opts.kind when deploying the implementation for a UUPS or Transparent proxy.
 *
 * @throws {BeaconProxyUnsupportedError} If this function is called for a Beacon proxy.
 */
export declare function processProxyKind(provider: EthereumProvider, proxyAddress: string | undefined, opts: ValidationOptions, data: ValidationData, version: Version): Promise<void>;
/**
 * Detects the kind of proxy at an address by reading its ERC 1967 storage slots.
 *
 * @deprecated Not reliable since UUPS proxies can have admin storage slot set, which causes
 * this function to treat it as transparent.  Instead, if implementation contract signatures are
 * available, infer the proxy kind using `inferProxyKind` instead.
 *
 * @param provider the Ethereum provider
 * @param proxyAddress the proxy address
 * @returns the proxy kind
 * @throws {UpgradesError} if the contract at address does not look like an ERC 1967 proxy
 */
export declare function detectProxyKind(provider: EthereumProvider, proxyAddress: string): Promise<"transparent" | "uups" | "beacon">;
//# sourceMappingURL=proxy-kind.d.ts.map