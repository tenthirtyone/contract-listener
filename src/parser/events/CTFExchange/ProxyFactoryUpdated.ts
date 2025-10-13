import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-ProxyFactoryUpdated");


export const ProxyFactoryUpdated: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    parameters,
  } = evt;

  const [oldProxyFactory, newProxyFactory] = parameters;

  logger.info(
    `Proxy factory updated - Old: ${oldProxyFactory}, New: ${newProxyFactory}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "ProxyFactoryUpdated", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update proxy factory configuration in database
  // Note: Prisma is not available in library mode - use external database connections
};
