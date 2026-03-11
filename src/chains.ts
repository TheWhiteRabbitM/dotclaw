import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export class Wallet {
  keyring: Keyring;
  pair: any;

  constructor(mnemonic: string) {
    if (!mnemonic || mnemonic.trim() === '') {
      throw new Error('MNEMONIC not configured. Please copy .env.example to .env and set your wallet mnemonic.');
    }
    
    this.keyring = new Keyring({ type: 'sr25519' });
    try {
      this.pair = this.keyring.addFromMnemonic(mnemonic.trim());
    } catch (error) {
      throw new Error(`Invalid MNEMONIC. Please check your .env file. Error: ${error}`);
    }
  }

  get address() {
    return this.pair.address;
  }
}

export class Chains {
  apis: Map<string, ApiPromise> = new Map();

  async connect(rpcs: Record<string, string>) {
    await cryptoWaitReady();
    
    for (const [name, url] of Object.entries(rpcs)) {
      const provider = new WsProvider(url);
      const api = await ApiPromise.create({ provider });
      await api.isReady;
      this.apis.set(name, api);
      console.log(`🔗 Connected to ${name}`);
    }
  }

  get(name: string) {
    return this.apis.get(name);
  }

  async disconnect() {
    for (const api of this.apis.values()) {
      await api.disconnect();
    }
  }
}