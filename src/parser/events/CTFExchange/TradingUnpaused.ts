import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingUnpaused");


export const TradingUnpaused: EventParserFunction = async (
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

  logger.info(`Trading unpaused by: ${pauser}`);

  // TODO: Update trading status in database
  // Note: Prisma is not available in library mode - use external database connections
};
