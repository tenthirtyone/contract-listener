import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-SafeFactoryUpdated");


export const SafeFactoryUpdated: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    parameters,
  } = evt;

  const [oldSafeFactory, newSafeFactory] = parameters;

  logger.info(
    `Safe factory updated - Old: ${oldSafeFactory}, New: ${newSafeFactory}`
  );

  // TODO: Update safe factory configuration in database
  // Note: Prisma is not available in library mode - use external database connections
};
