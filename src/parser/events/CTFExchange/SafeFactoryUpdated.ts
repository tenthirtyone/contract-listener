import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-SafeFactoryUpdated");


export const SafeFactoryUpdated: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [oldSafeFactory, newSafeFactory] = parameters;

  logger.info(
    `Safe factory updated - Old: ${oldSafeFactory}, New: ${newSafeFactory}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "SafeFactoryUpdated", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update safe factory configuration in database
  // Note: Prisma is not available in library mode - use external database connections
};
