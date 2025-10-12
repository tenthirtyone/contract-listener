import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderCancelled");


export const OrderCancelled: EventParserFunction = async (
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

  const [orderHash] = parameters;

  logger.info(`Order cancelled - Hash: ${orderHash}`);

  // TODO: Update order status in database
  // Note: Prisma is not available in library mode - use external database connections
};
