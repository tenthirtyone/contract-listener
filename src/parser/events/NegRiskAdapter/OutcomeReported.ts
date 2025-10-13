import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-OutcomeReported");

export const OutcomeReported: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [marketId, questionId, outcome] = parameters;

  logger.info(
    `Outcome reported - Market: ${marketId}, Question: ${questionId}, Outcome: ${outcome}`
  );
};
