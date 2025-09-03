import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderCancelled");

interface OrderCancelledData {
  orderHash: string;
}

interface OrderCancelledEvent extends ParsedEvent {
  data: OrderCancelledData;
}

export const OrderCancelled = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<OrderCancelledEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [orderHash] = args;

  const data: OrderCancelledEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      orderHash,
    },
    transaction,
    receipt,
  };

  logger.info(`Order cancelled - Hash: ${orderHash}`);

  // TODO: Update order status in database
  // For example: await prisma.ctfOrder.update({ where: { orderHash }, data: { cancelled: true } });

  return data;
};
