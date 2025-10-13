import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-QuestionInitialized");

export const QuestionInitialized: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [
    questionID,
    requestTimestamp,
    creator,
    ancillaryData,
    rewardToken,
    reward,
    proposalBond,
  ] = parameters;

  logger.info(
    `Question initialized - ID: ${questionID}, Creator: ${creator}, Reward: ${reward}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV3", "QuestionInitialized", options.chain, {
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
