import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-ProxyFactoryUpdated");


export const ProxyFactoryUpdated: EventParserFunction = async (
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

  const [oldProxyFactory, newProxyFactory] = parameters;

  logger.info(
    `Proxy factory updated - Old: ${oldProxyFactory}, New: ${newProxyFactory}`
  );

  // TODO: Update proxy factory configuration in database
  // Note: Prisma is not available in library mode - use external database connections
};
