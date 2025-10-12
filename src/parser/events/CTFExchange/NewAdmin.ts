import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewAdmin");


export const NewAdmin: EventParserFunction = async (
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

  const [newAdminAddress, admin] = parameters;

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);

  // TODO: Add database operations for admin tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
