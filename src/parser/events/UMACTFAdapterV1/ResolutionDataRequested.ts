import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-ResolutionDataRequested");

export const ResolutionDataRequested: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

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
};
