# Contract Listener Library

A flexible TypeScript library for listening to blockchain smart contract events with custom parsers and ABIs.

## Features

- ✅ **No Database Required**: Pass contracts directly in configuration
- ✅ **Custom ABIs**: Provide your own contract ABIs
- ✅ **Custom Parsers**: Implement custom event parsers
- ✅ **TypeScript Support**: Full type safety
- ✅ **Multiple Contracts**: Listen to multiple contracts simultaneously
- ✅ **Runtime Contract Addition**: Add contracts dynamically

## Installation

```bash
npm install @your-org/contract-listener
```

## Basic Usage

```typescript
import { Listener } from "contract-listener";

const listener = new Listener({
  name: "My App Listener",
  chain: 1, // Ethereum mainnet
  providerUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  contracts: [
    {
      address: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
      type: "CTFExchange",
      // Uses built-in CTFExchange ABI and parsers
    },
  ],
});

// Start listening
await listener.start();

// Stop when done
await listener.stop();
```

## Advanced Usage with Custom ABIs and Parsers

```typescript
import { Listener, EventParserFunction } from "contract-listener";

// Custom ERC20 ABI
const erc20Abi = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

// Custom parser function
const transferParser: EventParserFunction = async (
  event,
  listener,
  transaction,
  receipt,
  context
) => {
  console.log(
    `Transfer: ${event.data.from} → ${event.data.to} | Amount: ${event.data.value}`
  );
};

const listener = new Listener({
  name: "Advanced Listener",
  chain: 1,
  providerUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  contracts: [
    {
      address: "0xA0b86a33E6441e88C5F2712C3E9b74E39b2c7e4D", // USDC contract
      type: "ERC20",
      abi: erc20Abi, // Custom ABI
      parsers: {
        Transfer: transferParser, // Custom parser
        Approval: approvalParser,
      },
    },
    {
      address: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E", // CTFExchange
      type: "CTFExchange",
      // Uses built-in ABI and parsers automatically
    },
  ],
});

await listener.start();
```

## API Reference

### ListenerOptions

```typescript
interface ListenerOptions {
  name: string; // Listener name for logging
  chain: number; // Chain ID
  providerUrl: string; // RPC provider URL
  contracts: LibraryContract[]; // Required: contracts to listen to
}
```

### LibraryContract

```typescript
interface LibraryContract {
  address: string; // Contract address
  type: string; // Contract type identifier
  abi?: any; // Optional: custom ABI (falls back to built-in)
  parsers?: Record<string, EventParserFunction>; // Optional: custom parsers
}
```

### EventParserFunction

```typescript
type EventParserFunction = (
  event: ParsedEvent, // Parsed event data
  listener: Listener, // Listener instance
  transaction: any, // Raw transaction
  receipt: any, // Transaction receipt
  context: {
    // Context object
    logger: any; // Logger instance
    options: ListenerOptions; // Listener options
  }
) => Promise<void>;
```

### Listener Methods

```typescript
class Listener {
  constructor(options: ListenerOptions);

  async start(): Promise<void>; // Start listening
  async stop(): Promise<void>; // Stop listening
  async addContract(address: string, type: string, abi?: any): Promise<void>;
  getContracts(): ethers.Contract[]; // Get active contracts
  getProvider(): ethers.providers.JsonRpcProvider; // Get provider
  getParsers(): EventParsers; // Get parser manager
}
```

## Built-in Contract Types

- `CTFExchange`: Complete DeFi exchange with order matching
- Add your own types with custom ABIs and parsers

## Adding Contracts at Runtime

```typescript
// Add contract after listener is started
await listener.addContract(
  "0x6B3595068778DD592e39A122f4f5a5CF09C90fE2", // SUSHI token
  "ERC20",
  erc20Abi // Optional custom ABI
);

// Add custom parsers programmatically
listener.getParsers().addParser("ERC20", "Transfer", customTransferParser);
```

## Event Context

Parser functions receive a context object with:

- `logger`: Logger instance for logging
- `options`: Full listener options

No database context is provided since this is designed as a standalone library.

## Error Handling

The listener will automatically handle:

- Invalid contract addresses
- Missing ABIs (falls back to empty ABI)
- Parser execution errors (logged but don't crash the listener)

## Examples

See `library-example.ts` for a complete working example with custom contracts, ABIs, and parsers.

## Migration from Database Version

If you were using the database version:

1. Remove `PrismaClient` imports and usage
2. Replace database loading with direct contract configuration
3. Update your configuration to include `contracts` array
4. Remove database-related environment variables

The API is now much simpler and more flexible for library usage!
