import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-QuestionResolved");

export const QuestionResolved: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [questionID, emergencyReport] = parameters;

  logger.info(
    `Question resolved - ID: ${questionID}, Emergency: ${emergencyReport}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV1", "QuestionResolved", options.chain, {
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
