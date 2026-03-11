import type { ApiPromise } from '@polkadot/api';
export declare function getBalance(api: ApiPromise, address: string): Promise<string>;
