import type { ApiPromise } from '@polkadot/api';
import type { Wallet } from '../chains.js';

export async function getPools(api: ApiPromise): Promise<string> {
  const pools = await api.query.nominationPools.bondedPools.entries();
  
  let result = '🏊 Nomination Pools:\n\n';
  
  for (let i = 0; i < Math.min(pools.length, 5); i++) {
    const [key, pool] = pools[i];
    const poolId = key.args[0].toString();
    const poolData = pool.toJSON() as any;
    
    const metadata = await api.query.nominationPools.metadata(poolId);
    const name = metadata.toString() || `Pool ${poolId}`;
    
    result += `${poolId}. ${name}\n`;
    result += `   Members: ${poolData.memberCounter}\n`;
    result += `   State: ${poolData.state}\n\n`;
  }
  
  return result;
}

export async function joinPool(api: ApiPromise, wallet: Wallet, poolId: number, amount: string): Promise<string> {
  const decimals = api.registry.chainDecimals[0];
  const amountBN = BigInt(Number(amount) * Math.pow(10, decimals));
  
  const tx = api.tx.nominationPools.join(amountBN.toString(), poolId);
  
  const hash = await new Promise<string>((resolve, reject) => {
    tx.signAndSend(wallet.pair, ({ status }: any) => {
      if (status.isFinalized) resolve(status.asFinalized.toHex());
    }).catch(reject);
  });
  
  return `✅ Joined Pool #${poolId} with ${amount} DOT\nTx: ${hash.slice(0, 20)}...`;
}