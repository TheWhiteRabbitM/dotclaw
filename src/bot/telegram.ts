import { Telegraf } from 'telegraf';
import type { DOTClawAgent } from '../agent.js';

export class TelegramBot {
  private bot: Telegraf;
  private agent: DOTClawAgent;

  constructor(token: string, agent: DOTClawAgent) {
    this.bot = new Telegraf(token);
    this.agent = agent;
    this.setupHandlers();
  }

  private setupHandlers() {
    this.bot.command('start', (ctx) => {
      ctx.reply('🦀 DOTClaw Ready!\n\nCommands:\n• balance\n• validators\n• stake <amount>\n• pools\n• swap <amount> <from> for <to>');
    });

    this.bot.on('text', async (ctx) => {
      const message = ctx.message.text;
      const response = await this.agent.processMessage(message);
      ctx.reply(response);
    });
  }

  async start() {
    await this.bot.launch();
    console.log('📱 Telegram bot started');
  }
}