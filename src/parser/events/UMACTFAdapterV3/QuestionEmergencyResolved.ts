import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-QuestionEmergencyResolved");

export const QuestionEmergencyResolved: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID, payouts] = parameters;

  logger.info(`Question emergency resolved - ID: ${questionID}`);
};
