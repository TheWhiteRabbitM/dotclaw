import type { ApiPromise } from '@polkadot/api';

export async function getBalance(api: ApiPromise, address: string): Promise<string> {
  const account = await api.query.system.account(address);
  const accountData = account.toJSON() as { free: string };
  const free = accountData.free || '0';
  const decimals = api.registry.chainDecimals[0];
  const balance = Number(free) / Math.pow(10, decimals);
  return `💰 Balance: ${balance.toFixed(4)} DOT`;
}