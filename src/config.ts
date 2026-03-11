import dotenv from 'dotenv';

dotenv.config();

export const config = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
  openaiKey: process.env.OPENAI_API_KEY || '',
  mnemonic: process.env.MNEMONIC || '',
  rpcs: {
    polkadot: process.env.POLKADOT_RPC || 'wss://rpc.polkadot.io',
    hydration: process.env.HYDRATION_RPC || 'wss://rpc.hydration.gg',
  }
};