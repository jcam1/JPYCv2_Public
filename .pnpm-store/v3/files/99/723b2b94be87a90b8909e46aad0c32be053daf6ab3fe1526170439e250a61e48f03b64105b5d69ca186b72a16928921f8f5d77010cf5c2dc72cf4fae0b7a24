import { ValidationError } from './run';
import { ProxyDeployment } from '../manifest';
export { silenceWarnings } from '../utils/log';
/**
 * Option for the kind of proxy that will be used.
 */
export interface ProxyKindOption {
    /**
     * The kind of proxy to deploy, upgrade or import, or the kind of proxy that the implementation will be used with. Defaults to `"transparent"`.
     */
    kind?: ProxyDeployment['kind'];
}
/**
 * Validation options in a standalone context (without storage layout comparisons with a previous implementation).
 */
export interface StandaloneValidationOptions extends ProxyKindOption {
    /**
     * @deprecated Equivalent to including "struct-definition" and "enum-definition" in unsafeAllow. No longer necessary.
     */
    unsafeAllowCustomTypes?: boolean;
    /**
     * @deprecated Equivalent to including `"external-library-linking"` in {@link unsafeAllow}.
     */
    unsafeAllowLinkedLibraries?: boolean;
    /**
     * Selectively disable one or more validation errors.
     */
    unsafeAllow?: ValidationError['kind'][];
}
/**
 * Validation options in the context of an upgrade (with storage layout comparisons with a previous implementation).
 */
export interface ValidationOptions extends StandaloneValidationOptions {
    /**
     * Configure storage layout check to allow variable renaming.
     */
    unsafeAllowRenames?: boolean;
    /**
     * Upgrades the proxy or beacon without first checking for storage layout compatibility errors. This is a dangerous option meant to be used as a last resort.
     */
    unsafeSkipStorageCheck?: boolean;
}
export declare const ValidationErrorUnsafeMessages: Record<ValidationError['kind'], string[]>;
export declare function withValidationDefaults(opts: ValidationOptions): Required<ValidationOptions>;
export declare function processExceptions(contractName: string, errors: ValidationError[], opts: ValidationOptions): ValidationError[];
//# sourceMappingURL=overrides.d.ts.map