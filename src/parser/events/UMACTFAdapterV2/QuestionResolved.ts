import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV2-QuestionResolved");

export const QuestionResolved: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID, settledPrice, payouts] = parameters;

  logger.info(`Question resolved - ID: ${questionID}, Price: ${settledPrice}`);
};
