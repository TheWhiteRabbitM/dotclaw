export interface Config {
    telegramToken: string;
    openaiKey: string;
    mnemonic: string;
    rpcs: Record<string, string>;
}
