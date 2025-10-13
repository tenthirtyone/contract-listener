import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-QuestionPrepared");

export const QuestionPrepared: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [marketId, questionId, index, data] = parameters;

  logger.info(
    `Question prepared - Market: ${marketId}, Question: ${questionId}, Index: ${index}`
  );
};
