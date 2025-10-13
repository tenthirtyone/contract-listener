import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-QuestionInitialized");

export const QuestionInitialized: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [
    questionID,
    ancillaryData,
    resolutionTime,
    rewardToken,
    reward,
    proposalBond,
    earlyResolutionEnabled,
  ] = parameters;

  logger.info(
    `Question initialized - ID: ${questionID}, Reward: ${reward}, Resolution: ${resolutionTime}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV1", "QuestionInitialized", options.chain, {
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
