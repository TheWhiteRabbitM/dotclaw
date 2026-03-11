import type { Config } from './types.js';
export declare class DOTClawAgent {
    private wallet;
    private chains;
    private openai;
    private telegram;
    constructor(config: Config);
    start(): Promise<void>;
    processMessage(message: string): Promise<string>;
    private detectIntent;
}
