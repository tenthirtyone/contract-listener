import { createLogger } from "../../../logger";
import { ParsedEvent, EventParserFunction } from "../../../types";

const logger = createLogger("CTFExchange-FeeCharged");

export const FeeCharged: EventParserFunction = async (
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

  const [receiver, tokenId, amount] = parameters;

  logger.info(
    `Fee charged - Receiver: ${receiver.toLowerCase()}, TokenId: ${tokenId.toString()}, Amount: ${amount.toString()}`
  );

  // TODO: Add database operations for fee tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
