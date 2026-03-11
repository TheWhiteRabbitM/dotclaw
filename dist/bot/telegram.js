import { Telegraf } from 'telegraf';
export class TelegramBot {
    bot;
    agent;
    constructor(token, agent) {
        this.bot = new Telegraf(token);
        this.agent = agent;
        this.setupHandlers();
    }
    setupHandlers() {
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
