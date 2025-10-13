import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-QuestionUpdated");

export const QuestionUpdated: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [
    questionID,
    ancillaryData,
    resolutionTime,
    rewardToken,
    reward,
    proposalBond,
    earlyResolutionEnabled,
  ] = parameters;

  logger.info(`Question updated - ID: ${questionID}, Reward: ${reward}`);
};
