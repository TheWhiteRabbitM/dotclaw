import OpenAI from 'openai';
import { Wallet, Chains } from './chains.js';
import { TelegramBot } from './bot/telegram.js';
import * as skills from './skills/index.js';
export class DOTClawAgent {
    wallet;
    chains;
    openai;
    telegram;
    constructor(config) {
        this.wallet = new Wallet(config.mnemonic);
        this.chains = new Chains();
        this.openai = new OpenAI({ apiKey: config.openaiKey });
        this.telegram = new TelegramBot(config.telegramToken, this);
    }
    async start() {
        await this.chains.connect({
            polkadot: 'wss://rpc.polkadot.io',
            hydration: 'wss://rpc.hydration.gg',
        });
        await this.telegram.start();
        console.log(`💼 Wallet: ${this.wallet.address}`);
    }
    async processMessage(message) {
        // Simple intent detection
        const intent = await this.detectIntent(message);
        try {
            switch (intent.action) {
                case 'balance':
                    return await skills.getBalance(this.chains.get('polkadot'), this.wallet.address);
                case 'validators':
                    return await skills.getValidators(this.chains.get('polkadot'));
                case 'stake':
                    return await skills.stake(this.chains.get('polkadot'), this.wallet, intent.amount);
                case 'pools':
                    return await skills.getPools(this.chains.get('polkadot'));
                case 'join_pool':
                    return await skills.joinPool(this.chains.get('polkadot'), this.wallet, intent.poolId, intent.amount);
                case 'swap':
                    return await skills.swap(this.chains, this.wallet, intent.from, intent.to, intent.amount);
                case 'unbond':
                    return await skills.unbond(this.chains.get('polkadot'), this.wallet, intent.amount);
                default:
                    return "I don't understand. Try: 'balance', 'validators', 'stake 100 DOT', 'pools', 'swap 10 DOT for USDC'";
            }
        }
        catch (error) {
            return `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }
    async detectIntent(message) {
        const lower = message.toLowerCase();
        if (lower.includes('balance'))
            return { action: 'balance' };
        if (lower.includes('validator'))
            return { action: 'validators' };
        if (lower.includes('pool') && !lower.includes('join'))
            return { action: 'pools' };
        // Stake X DOT
        const stakeMatch = lower.match(/stake\s+(\d+)/);
        if (stakeMatch)
            return { action: 'stake', amount: stakeMatch[1] };
        // Join pool X with Y DOT
        const joinMatch = lower.match(/join\s+pool\s+(\d+)\s+(?:with\s+)?(\d+)/);
        if (joinMatch)
            return { action: 'join_pool', poolId: parseInt(joinMatch[1]), amount: joinMatch[2] };
        // Unbond X DOT
        const unbondMatch = lower.match(/unbond\s+(\d+)/);
        if (unbondMatch)
            return { action: 'unbond', amount: unbondMatch[1] };
        // Swap X for Y
        const swapMatch = lower.match(/swap\s+(\d+)\s+(\w+)\s+for\s+(\w+)/);
        if (swapMatch)
            return { action: 'swap', amount: swapMatch[1], from: swapMatch[2], to: swapMatch[3] };
        return { action: 'unknown' };
    }
}
