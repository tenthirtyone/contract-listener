import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-OutcomeReported");

export const OutcomeReported: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [marketId, questionId, outcome] = parameters;

  logger.info(
    `Outcome reported - Market: ${marketId}, Question: ${questionId}, Outcome: ${outcome}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "OutcomeReported", options.chain, {
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
