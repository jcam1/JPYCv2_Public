import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { EtherscanNetworkEntry } from '@nomiclabs/hardhat-etherscan/dist/src/types';
/**
 * Call the configured Etherscan API with the given parameters.
 *
 * @param etherscanApi The Etherscan API config
 * @param params The API parameters to call with
 * @returns The Etherscan API response
 */
export declare function callEtherscanApi(etherscanApi: EtherscanAPIConfig, params: any): Promise<EtherscanResponseBody>;
/**
 * Gets the Etherscan API parameters from Hardhat config.
 * Makes use of Hardhat Etherscan for handling cases when Etherscan API parameters are not present in config.
 */
export declare function getEtherscanAPIConfig(hre: HardhatRuntimeEnvironment): Promise<EtherscanAPIConfig>;
/**
 * The Etherscan API parameters from the Hardhat config.
 */
export interface EtherscanAPIConfig {
    key: string;
    endpoints: EtherscanNetworkEntry;
}
/**
 * The response body from an Etherscan API call.
 */
interface EtherscanResponseBody {
    status: string;
    message: string;
    result: any;
}
export declare const RESPONSE_OK = "1";
export {};
//# sourceMappingURL=etherscan-api.d.ts.map