import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-DeauthorizedUser");

export const DeauthorizedUser: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [usr] = parameters;

  logger.info(`User deauthorized - Address: ${usr}`);
};
