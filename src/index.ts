import { Listener } from "./listener";
export * from "./types";
import express from "express";
import { createLogger } from "./logger";

async function main() {
  const ethereum = new Listener({
    providerUrl: process.env.ETHEREUM_URL,
    name: "EthereumListener",
    chain: 1,
  });
  await ethereum.start();

  const sepolia = new Listener({
    providerUrl: process.env.SEPOLIA_URL,
    name: "SepoliaListener",
    chain: 11155111,
  });
  await sepolia.start();

  const polygon = new Listener({
    providerUrl: process.env.POLYGON_URL,
    name: "PolygonListener",
    chain: 137,
  });
  await polygon.start();

  const mumbai = new Listener({
    providerUrl: process.env.MUMBAI_URL,
    name: "MumbaiListener",
    chain: 80001,
  });
  await mumbai.start();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const logger = createLogger("contract-listener");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send(true));

app.listen(port, () => logger.info(`Server is running on port ${port}`));
