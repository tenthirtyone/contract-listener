import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-QuestionFlagged");

export const QuestionFlagged: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID] = parameters;

  logger.info(`Question flagged - ID: ${questionID}`);
};
