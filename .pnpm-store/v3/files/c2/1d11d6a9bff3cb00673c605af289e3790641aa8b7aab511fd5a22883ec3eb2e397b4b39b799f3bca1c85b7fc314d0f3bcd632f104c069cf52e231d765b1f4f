import { SolcOutput, SolcInput } from '../..';
/**
 * A build info file containing Solidity compiler input and output JSON objects.
 */
export interface BuildInfoFile {
    /**
     * The Solidity compiler version.
     */
    solcVersion: string;
    /**
     * The Solidity compiler input JSON object.
     */
    input: SolcInput;
    /**
     * The Solidity compiler output JSON object.
     */
    output: SolcOutput;
    /**
     * Short name of the build info dir containing this file.
     */
    dirShortName: string;
}
/**
 * Gets the build info files from the build info directory.
 *
 * @param buildInfoDir Build info directory, or undefined to use the default Hardhat or Foundry build-info dir.
 * @returns The build info files with Solidity compiler input and output.
 */
export declare function getBuildInfoFiles(buildInfoDir?: string): Promise<BuildInfoFile[]>;
//# sourceMappingURL=build-info-file.d.ts.map