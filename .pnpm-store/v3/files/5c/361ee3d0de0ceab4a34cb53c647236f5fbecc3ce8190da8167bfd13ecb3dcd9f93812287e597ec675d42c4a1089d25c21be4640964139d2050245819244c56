import util from 'util';
interface ErrorDescriptor<E> {
    msg: (e: E) => string;
    hint?: (e: E) => string | undefined;
    link?: string;
}
export type ErrorDescriptions<E extends {
    kind: string;
}> = {
    [K in E['kind']]: ErrorDescriptor<E & {
        kind: K;
    }>;
};
declare function noDetails(): string;
export declare class UpgradesError extends Error {
    constructor(message: string, details?: typeof noDetails);
    [util.inspect.custom](): string;
}
export {};
//# sourceMappingURL=error.d.ts.map