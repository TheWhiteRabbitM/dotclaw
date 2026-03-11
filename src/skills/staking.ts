import type { ApiPromise } from '@polkadot/api';
import type { Wallet, Chains } from '../chains.js';

export async function getValidators(api: ApiPromise): Promise<string> {
  const validators = await api.query.session.validators();
  const validatorArray = validators.toJSON() as string[];
  const validatorList = validatorArray.slice(0, 5).map((v) => v.slice(0, 20) + '...');
  return `📋 Top 5 Validators:\n${validatorList.join('\n')}`;
}

export async function stake(api: ApiPromise, wallet: Wallet, amount: string): Promise<string> {
  const decimals = api.registry.chainDecimals[0];
  const amountBN = BigInt(Number(amount) * Math.pow(10, decimals));
  
  const tx = api.tx.staking.bond(amountBN.toString(), 'Staked');
  const hash = await sendTx(tx, wallet);
  
  return `✅ Staked ${amount} DOT\nTx: ${hash.slice(0, 20)}...`;
}

export async function unbond(api: ApiPromise, wallet: Wallet, amount: string): Promise<string> {
  const decimals = api.registry.chainDecimals[0];
  const amountBN = BigInt(Number(amount) * Math.pow(10, decimals));
  
  const tx = api.tx.staking.unbond(amountBN.toString());
  const hash = await sendTx(tx, wallet);
  
  return `✅ Unbonded ${amount} DOT\nTx: ${hash.slice(0, 20)}...`;
}

async function sendTx(tx: any, wallet: Wallet): Promise<string> {
  return new Promise((resolve, reject) => {
    tx.signAndSend(wallet.pair, ({ status }: any) => {
      if (status.isFinalized) resolve(status.asFinalized.toHex());
    }).catch(reject);
  });
}