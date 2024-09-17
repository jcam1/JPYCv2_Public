import { ImplDeployment } from './manifest';
export declare function stubProvider(chainId?: number, clientVersion?: string): {
    mine: () => void;
    deploy: (immediate?: boolean) => Promise<ImplDeployment>;
    deployPending: () => Promise<ImplDeployment>;
    readonly deployCount: number;
    isContract(address: string): boolean;
    removeContract(address: string): boolean;
    addContract(address: string): Set<string>;
    getMethodCount(method: string): number;
    failTx(txHash: string): Set<string>;
    send(method: string, params?: unknown[]): Promise<any>;
};
//# sourceMappingURL=stub-provider.d.ts.map