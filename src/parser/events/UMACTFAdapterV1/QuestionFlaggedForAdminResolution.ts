import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger(
  "UMACTFAdapterV1-QuestionFlaggedForAdminResolution"
);

export const QuestionFlaggedForAdminResolution: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID] = parameters;

  logger.info(`Question flagged for admin resolution - ID: ${questionID}`);
};
