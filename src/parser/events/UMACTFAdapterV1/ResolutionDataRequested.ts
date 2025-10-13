import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-ResolutionDataRequested");

export const ResolutionDataRequested: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [
    requestor,
    requestTimestamp,
    questionID,
    identifier,
    ancillaryData,
    rewardToken,
    reward,
    proposalBond,
    earlyResolution,
  ] = parameters;

  logger.info(
    `Resolution data requested - Question: ${questionID}, Requestor: ${requestor}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV1", "ResolutionDataRequested", options.chain, {
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
