import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-QuestionPrepared");

export const QuestionPrepared: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [marketId, questionId, index, data] = parameters;

  logger.info(
    `Question prepared - Market: ${marketId}, Question: ${questionId}, Index: ${index}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "QuestionPrepared", options.chain, {
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
