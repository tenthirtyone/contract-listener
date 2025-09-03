import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-FeeCharged");

interface FeeChargedData {
  receiver: string;
  tokenId: string;
  amount: string;
}

interface FeeChargedEvent extends ParsedEvent {
  data: FeeChargedData;
}

export const FeeCharged = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<FeeChargedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [receiver, tokenId, amount] = args;

  const data: FeeChargedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      receiver,
      tokenId: tokenId.toString(),
      amount: amount.toString(),
    },
    transaction,
    receipt,
  };

  logger.info(
    `Fee charged - Receiver: ${receiver}, TokenId: ${tokenId}, Amount: ${amount}`
  );

  // TODO: Add database operations for fee tracking if needed
  // For example: await prisma.feeCharged.create({ data: { ... } });

  return data;
};
