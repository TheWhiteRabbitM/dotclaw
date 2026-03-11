import type { Chains, Wallet } from '../chains.js';
export declare function swap(chains: Chains, wallet: Wallet, from: string, to: string, amount: string): Promise<string>;
