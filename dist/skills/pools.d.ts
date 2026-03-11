import type { ApiPromise } from '@polkadot/api';
import type { Wallet } from '../chains.js';
export declare function getPools(api: ApiPromise): Promise<string>;
export declare function joinPool(api: ApiPromise, wallet: Wallet, poolId: number, amount: string): Promise<string>;
