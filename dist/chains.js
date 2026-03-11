import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
export class Wallet {
    keyring;
    pair;
    constructor(mnemonic) {
        this.keyring = new Keyring({ type: 'sr25519' });
        this.pair = this.keyring.addFromMnemonic(mnemonic);
    }
    get address() {
        return this.pair.address;
    }
}
export class Chains {
    apis = new Map();
    async connect(rpcs) {
        await cryptoWaitReady();
        for (const [name, url] of Object.entries(rpcs)) {
            const provider = new WsProvider(url);
            const api = await ApiPromise.create({ provider });
            await api.isReady;
            this.apis.set(name, api);
            console.log(`🔗 Connected to ${name}`);
        }
    }
    get(name) {
        return this.apis.get(name);
    }
    async disconnect() {
        for (const api of this.apis.values()) {
            await api.disconnect();
        }
    }
}
