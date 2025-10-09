import { Listener } from "./listener";
import { LibraryContract } from "./types";
export * from "./types";
import express from "express";
import { createLogger } from "./logger";

interface ListenerConfig {
  providerUrl: string | undefined;
  name: string;
  chain: number;
  contracts: LibraryContract[];
}

const LISTENER_CONFIGS: ListenerConfig[] = [
  {
    providerUrl:
      process.env.ETHEREUM_URL ||
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    name: "TestListener",
    chain: 137, // Polygon mainnet
    contracts: [
      {
        address: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
        type: "CTFExchange",
      },
    ],
  },
];

async function main() {
  console.log("Starting listeners...");
  const listeners = LISTENER_CONFIGS.filter((config) => config.providerUrl).map(
    (config) => new Listener(config)
  );

  console.log(`Created ${listeners.length} listeners`);

  await Promise.all(listeners.map((listener) => listener.start()));
  console.log("Listeners started");

  // Keep the process running
  console.log("Listener is running... Press Ctrl+C to exit");
}

main().catch((error) => {
  console.error("Main error:", error);
  process.exitCode = 1;
});

// Only start web server if not in test mode
if (process.env.NODE_ENV !== "test") {
  const logger = createLogger("contract-listener");

  const app = express();
  const port = process.env.PORT || 8080;

  app.get("/", (_req, res) => res.send(true));

  app.listen(port, () => logger.info(`Server is running on port ${port}`));
}
