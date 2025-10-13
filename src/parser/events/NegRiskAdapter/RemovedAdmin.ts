import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-RemovedAdmin");

export const RemovedAdmin: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [admin, removedAdmin] = parameters;

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);
};
