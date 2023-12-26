import { createLogger } from "../../../logger";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("Seaport-OrdersMatched");

export const OrdersMatched = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  prisma: any
): Promise<TransferSingleEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  return;
};
