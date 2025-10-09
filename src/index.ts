import { Listener } from "./listener";
export * from "./types";
import express from "express";
import { createLogger } from "./logger";

interface ListenerConfig {
  providerUrl: string | undefined;
  name: string;
  chain: number;
}

const LISTENER_CONFIGS: ListenerConfig[] = [
  {
    providerUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    name: "PolygonListener",
    chain: 8453,
  },
];

async function main() {
  const listeners = LISTENER_CONFIGS.filter((config) => config.providerUrl).map(
    (config) => new Listener(config)
  );

  await Promise.all(listeners.map((listener) => listener.start()));

  // Add CTFExchange contract to all listeners
  await Promise.all(
    listeners.map((listener) =>
      listener.addContract(
        "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
        "CTFExchange"
      )
    )
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const logger = createLogger("contract-listener");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req, res) => res.send(true));

app.listen(port, () => logger.info(`Server is running on port ${port}`));
