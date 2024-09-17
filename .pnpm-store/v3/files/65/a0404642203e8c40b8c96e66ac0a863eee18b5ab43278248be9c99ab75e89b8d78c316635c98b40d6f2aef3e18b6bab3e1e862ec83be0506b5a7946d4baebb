import { UpgradesError } from '.';
import { EthereumProvider } from './provider';
export declare class InvalidBeacon extends UpgradesError {
}
/**
 * Gets the implementation address from the beacon using its implementation() function.
 * @param provider
 * @param beaconAddress
 * @returns The implementation address.
 * @throws {InvalidBeacon} If the implementation() function could not be called or does not return an address.
 */
export declare function getImplementationAddressFromBeacon(provider: EthereumProvider, beaconAddress: string): Promise<string>;
/**
 * Gets the implementation address from a UUPS/Transparent/Beacon proxy.
 *
 * @returns a Promise with the implementation address, or undefined if a UUPS/Transparent/Beacon proxy is not located at the address.
 */
export declare function getImplementationAddressFromProxy(provider: EthereumProvider, proxyAddress: string): Promise<string | undefined>;
//# sourceMappingURL=impl-address.d.ts.map