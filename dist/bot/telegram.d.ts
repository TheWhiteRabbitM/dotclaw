import type { DOTClawAgent } from '../agent.js';
export declare class TelegramBot {
    private bot;
    private agent;
    constructor(token: string, agent: DOTClawAgent);
    private setupHandlers;
    start(): Promise<void>;
}
