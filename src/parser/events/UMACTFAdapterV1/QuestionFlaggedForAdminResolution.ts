import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger(
  "UMACTFAdapterV1-QuestionFlaggedForAdminResolution"
);

export const QuestionFlaggedForAdminResolution: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [questionID] = parameters;

  logger.info(`Question flagged for admin resolution - ID: ${questionID}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV1", "QuestionFlaggedForAdminResolution", options.chain, {
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
