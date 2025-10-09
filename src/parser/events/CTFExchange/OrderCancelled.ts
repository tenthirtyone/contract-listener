import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderCancelled");

export const OrderCancelled = async (
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

  const [orderHash] = parameters;

  logger.info(`Order cancelled - Hash: ${orderHash}`);

  // TODO: Update order status in database
  // For example: await prisma.ctfOrder.update({ where: { orderHash }, data: { cancelled: true } });
};
