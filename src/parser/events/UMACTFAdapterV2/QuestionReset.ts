import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV2-QuestionReset");

export const QuestionReset: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [questionID] = parameters;

  logger.info(`Question reset - ID: ${questionID}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV2", "QuestionReset", options.chain, {
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
