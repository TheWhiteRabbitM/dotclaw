import { DOTClawAgent } from './agent.js';
import { config } from './config.js';
async function main() {
    console.log('🦀 Starting DOTClaw...\n');
    const agent = new DOTClawAgent(config);
    await agent.start();
    console.log('✅ DOTClaw is ready!\n');
}
main().catch(console.error);
