import minimist from 'minimist';
import { ValidateUpgradeSafetyOptions } from '.';
export declare function main(args: string[]): Promise<void>;
interface FunctionArgs {
    buildInfoDir?: string;
    contract?: string;
    reference?: string;
    opts: Required<ValidateUpgradeSafetyOptions>;
    referenceBuildInfoDirs?: string[];
    exclude?: string[];
}
/**
 * Gets and validates function arguments and options.
 * @returns Function arguments
 * @throws Error if any arguments or options are invalid.
 */
export declare function getFunctionArgs(parsedArgs: minimist.ParsedArgs, extraArgs: string[]): FunctionArgs;
export declare function withDefaults(parsedArgs: minimist.ParsedArgs): Required<ValidateUpgradeSafetyOptions>;
export {};
//# sourceMappingURL=validate.d.ts.map