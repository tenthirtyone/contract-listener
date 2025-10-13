import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderCancelled");


export const OrderCancelled: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [orderHash] = parameters;

  logger.info(`Order cancelled - Hash: ${orderHash}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "OrderCancelled", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update order status in database
  // Note: Prisma is not available in library mode - use external database connections
};
