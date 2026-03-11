import { Wallet, Chains } from './src/chains.js';

console.log('🦀 DOTClaw Setup\n');

async function setup() {
  try {
    // Check env
    if (!process.env.MNEMONIC) {
      console.log('⚠️  Please set MNEMONIC in .env');
      process.exit(1);
    }

    console.log('1️⃣  Testing wallet...');
    const wallet = new Wallet(process.env.MNEMONIC);
    console.log(`   ✅ Wallet: ${wallet.address}`);

    console.log('\n2️⃣  Connecting to chains...');
    const chains = new Chains();
    await chains.connect({
      polkadot: process.env.POLKADOT_RPC || 'wss://rpc.polkadot.io',
      hydration: process.env.HYDRATION_RPC || 'wss://rpc.hydration.gg',
    });

    console.log('\n3️⃣  Testing balance query...');
    const api = chains.get('polkadot')!;
    const { data } = await api.query.system.account(wallet.address);
    const free = Number(data.free.toString()) / 1e10;
    console.log(`   ✅ Balance: ${free.toFixed(4)} DOT`);

    await chains.disconnect();
    
    console.log('\n✨ Setup complete! Run: npm run dev\n');
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

setup();