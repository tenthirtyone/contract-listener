import { createLogger } from "../../../logger";
import { ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-FeeCharged");

export const FeeCharged = async (
  evt: ParsedEvent,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<void> => {
  const { prisma } = context;
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
  // For example: await prisma.feeCharged.create({ data: { ... } });
};
