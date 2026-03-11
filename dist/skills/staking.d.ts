import type { ApiPromise } from '@polkadot/api';
import type { Wallet } from '../chains.js';
export declare function getValidators(api: ApiPromise): Promise<string>;
export declare function stake(api: ApiPromise, wallet: Wallet, amount: string): Promise<string>;
export declare function unbond(api: ApiPromise, wallet: Wallet, amount: string): Promise<string>;
