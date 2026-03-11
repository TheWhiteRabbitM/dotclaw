# DOTClaw 🦀

[![Polkadot](https://img.shields.io/badge/Polkadot-E6007A?logo=polkadot&logoColor=white)](https://polkadot.network)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

**AI Agent for autonomous Polkadot operations via WhatsApp & Telegram.**

Stake DOT, swap on Hydration, manage nomination pools, and execute cross-chain XCM transfers — all through natural language commands.

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/dotclaw/dotclaw.git
cd dotclaw

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your settings:
# - TELEGRAM_BOT_TOKEN: Get from @BotFather on Telegram
# - OPENAI_API_KEY: Get from https://platform.openai.com/api-keys
# - MNEMONIC: Your Polkadot wallet mnemonic (12 or 24 words)
```

**⚠️ IMPORTANT: Use a test wallet with small amounts only!**

Generate a test wallet at: https://polkadot.js.org/apps/#/accounts/create

### 3. Run

```bash
# Start the agent
npm run dev
```

## 💬 Example Commands

- **"What's my DOT balance?"** → Shows balance + USD value
- **"Stake 500 DOT with best validators"** → Auto-selects validators by commission/APY
- **"Join nomination pool #42 with 100 DOT"** → Joins pool
- **"Swap 50 DOT for USDC on Hydration"** → Executes DEX swap
- **"Show my staking rewards"** → Displays pending rewards
- **"Unbond 200 DOT"** → Starts unbonding process

## 🏗️ Architecture

```
dotclaw/
├── src/
│   ├── index.ts              # Entry point
│   ├── agent.ts              # AI agent core
│   ├── chains.ts             # Polkadot/Hydration connections
│   ├── config.ts             # Environment config
│   ├── bot/
│   │   └── telegram.ts       # Telegram bot handler
│   └── skills/
│       ├── staking.ts        # Staking operations
│       ├── pools.ts          # Nomination pools
│       ├── swap.ts           # Hydration DEX swaps
│       └── balance.ts        # Balance queries
├── website/                  # Landing page
│   ├── index.html           
│   ├── styles.css
│   ├── script.js
│   └── images/              # Add real protocol logos here
│       ├── crab-mascot.png
│       ├── hydration-logo.png
│       ├── astar-logo.png
│       ├── moonbeam-logo.png
│       └── polkadot-logo.png
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🔌 Supported Protocols

| Protocol | Type | Status |
|----------|------|--------|
| **Hydration** | DEX (Omnipool) | ✅ Live |
| **Polkadot** | Native Staking | ✅ Live |
| **Nomination Pools** | Pool Staking | ✅ Live |
| **Astar** | WASM + EVM | 🚧 Coming Soon |
| **Moonbeam** | EVM Compatible | 🚧 Coming Soon |
| **XCM** | Cross-Chain | 🚧 Coming Soon |

## 🔐 Security

- **Isolated execution**: Runs in containerized environment
- **Encrypted keys**: Private keys never exposed
- **Secure enclave**: Key management via encrypted storage
- **Audit ready**: All transactions logged and verifiable

## 🛠️ Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🙏 Credits

- Built with [Polkadot JS API](https://polkadot.js.org/)
- DEX integration via [Galactic Council SDK](https://github.com/galacticcouncil/sdk)
- Staking features inspired by [Polkadot Staking Dashboard](https://github.com/polkadot-cloud/polkadot-staking-dashboard)
- Website design inspired by [SolClaw](https://www.solclaw.ai/)

---

**Made with 💜 for the Polkadot ecosystem**