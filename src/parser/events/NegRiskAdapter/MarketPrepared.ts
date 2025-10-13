import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-MarketPrepared");

export const MarketPrepared: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [marketId, oracle, feeBips, data] = parameters;

  logger.info(
    `Market prepared - ID: ${marketId}, Oracle: ${oracle}, Fee: ${feeBips}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "MarketPrepared", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }
};
