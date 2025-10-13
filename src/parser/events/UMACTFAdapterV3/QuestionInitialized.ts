import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-QuestionInitialized");

export const QuestionInitialized: EventParserFunction = async (
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
};
