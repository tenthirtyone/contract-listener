import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-QuestionFlagged");

export const QuestionFlagged: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [questionID] = parameters;

  logger.info(`Question flagged - ID: ${questionID}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV3", "QuestionFlagged", options.chain, {
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
