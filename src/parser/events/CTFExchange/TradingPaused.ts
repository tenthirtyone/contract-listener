import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingPaused");


export const TradingPaused: EventParserFunction = async (
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

  const [pauser] = parameters;

  logger.info(`Trading paused by: ${pauser}`);

  // TODO: Update trading status in database
  // Note: Prisma is not available in library mode - use external database connections
};
