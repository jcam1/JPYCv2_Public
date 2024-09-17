export type BasicOperation<T> = {
    kind: 'append' | 'insert';
    updated: T;
} | {
    kind: 'delete';
    original: T;
} | {
    kind: 'delete-namespace';
    namespace: string;
    original: {
        contract: string;
    };
};
export type Operation<T, C> = C | BasicOperation<T>;
export type Cost = {
    cost?: number;
};
type GetChangeOp<T, C> = (a: T, b: T) => (C & Cost) | undefined;
export declare function levenshtein<T, C>(a: T[], b: T[], getChangeOp: GetChangeOp<T, C>): Operation<T, C>[];
export {};
//# sourceMappingURL=levenshtein.d.ts.map