import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedAdmin");


export const RemovedAdmin: EventParserFunction = async (
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

  const [removedAdmin, admin] = parameters;

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);

  // TODO: Update admin status in database
  // Note: Prisma is not available in library mode - use external database connections
};
