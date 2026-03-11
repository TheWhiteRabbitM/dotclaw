import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
export declare class Wallet {
    keyring: Keyring;
    pair: any;
    constructor(mnemonic: string);
    get address(): any;
}
export declare class Chains {
    apis: Map<string, ApiPromise>;
    connect(rpcs: Record<string, string>): Promise<void>;
    get(name: string): ApiPromise | undefined;
    disconnect(): Promise<void>;
}
