import { Listener } from "./dist/listener/Listener";
import { EventParserFunction } from "./dist/types";

// Example of using the Listener as a library
async function libraryExample() {
  // Custom ABI for a hypothetical ERC20 token
  const erc20Abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
  ];

  // Custom parser for Transfer events
  const transferParser: EventParserFunction = async (
    event,
    listener,
    transaction,
    receipt,
    context
  ) => {
    console.log(
      `📤 Transfer: ${event.data.from} → ${event.data.to} | Amount: ${event.data.value}`
    );
  };

  // Custom parser for Approval events
  const approvalParser: EventParserFunction = async (
    event,
    listener,
    transaction,
    receipt,
    context
  ) => {
    console.log(
      `✅ Approval: ${event.data.owner} approved ${event.data.spender} for ${event.data.value}`
    );
  };

  // Initialize listener with custom contracts
  const listener = new Listener({
    name: "Library Example",
    chain: 1,
    providerUrl:
      process.env.ETHEREUM_URL ||
      "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    contracts: [
      {
        address: "0xA0b86a33E6441e88C5F2712C3E9b74E39b2c7e4D", // Example ERC20 contract
        type: "ERC20",
        abi: erc20Abi,
        parsers: {
          Transfer: transferParser,
          Approval: approvalParser,
        },
      },
      {
        address: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E", // CTFExchange contract
        type: "CTFExchange",
        // abi is optional - will use built-in CTFExchange ABI if not provided
        // parsers is optional - will use built-in parsers if not provided
      },
    ],
  });

  // Start listening
  await listener.start();

  // Add another contract dynamically
  await listener.addContract(
    "0x6B3595068778DD592e39A122f4f5a5CF09C90fE2", // SUSHI token
    "ERC20",
    erc20Abi
  );

  // Add custom parsers for the SUSHI token
  listener.getParsers().addParser("ERC20", "Transfer", transferParser);

  console.log("🚀 Library example started! Listening to events...");

  // Keep running for a bit
  setTimeout(async () => {
    await listener.stop();
    console.log("🛑 Listener stopped");
  }, 30000); // Run for 30 seconds
}

// Run the example
libraryExample().catch(console.error);
