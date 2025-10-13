import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedAdmin");


export const RemovedAdmin: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [removedAdmin, admin] = parameters;

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "RemovedAdmin", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update admin status in database
  // Note: Prisma is not available in library mode - use external database connections
};
