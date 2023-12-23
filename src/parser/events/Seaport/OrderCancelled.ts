import { createLogger } from "@/logger";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("Seaport-OrderCanceled");

export const OrderCancelled = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  prisma: any
): Promise<TransferSingleEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [orderHash, offerer, zone] = args;

  logger.info(`tx:${transactionHash} | order:${orderHash}`);

  return;
};
