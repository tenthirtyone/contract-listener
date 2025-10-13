import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-RemovedAdmin");

export const RemovedAdmin: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [admin, removedAdmin] = parameters;

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "RemovedAdmin", options.chain, {
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
