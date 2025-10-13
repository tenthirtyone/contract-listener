import { createLogger } from "../../../logger";
import { ParsedEvent, EventParserFunction } from "../../../types";

const logger = createLogger("CTFExchange-FeeCharged");

export const FeeCharged: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [receiver, tokenId, amount] = parameters;

  logger.info(
    `Fee charged - Receiver: ${receiver.toLowerCase()}, TokenId: ${tokenId.toString()}, Amount: ${amount.toString()}`
  );

  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "FeeCharged", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Add database operations for fee tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
