import { DOTClawAgent } from './agent.js';
import { config } from './config.js';

async function main() {
  console.log('🦀 Starting DOTClaw...\n');
  
  // Validate configuration
  if (!config.mnemonic || config.mnemonic.trim() === '' || config.mnemonic === 'your_mnemonic_here') {
    console.error('❌ Error: MNEMONIC not configured!');
    console.error('   Please copy .env.example to .env and set your wallet mnemonic.');
    console.error('   Generate a test wallet at: https://polkadot.js.org/apps/#/accounts/create\n');
    process.exit(1);
  }
  
  if (!config.telegramToken) {
    console.warn('⚠️  Warning: TELEGRAM_BOT_TOKEN not set. Bot features will be disabled.');
  }
  
  if (!config.openaiKey) {
    console.warn('⚠️  Warning: OPENAI_API_KEY not set. AI features will use basic matching.\n');
  }
  
  const agent = new DOTClawAgent(config);
  await agent.start();
  
  console.log('✅ DOTClaw is ready!\n');
}

main().catch((error) => {
  console.error('\n❌ Fatal Error:', error.message);
  console.error('\nTroubleshooting:');
  console.error('1. Ensure .env file exists: cp .env.example .env');
  console.error('2. Set MNEMONIC in .env with a valid 12/24 word phrase');
  console.error('3. Run: npm run dev\n');
  process.exit(1);
});