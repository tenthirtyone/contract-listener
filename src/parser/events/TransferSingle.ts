import { createLogger } from "@/logger";
import { getTransactionData } from "@/utils";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("TransferSingle");

export const TransferSingle = async (evt: Event, eventListener: any, transaction: any, receipt: any): Promise<TransferSingleEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const operator = args[0];
  const from = args[1];
  const to = args[2];
  const tokenId = args[3].toNumber();
  const value = args[4].toNumber();

  const price = eventListener.price;

  const data: TransferSingleEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { operator, from, to, tokenId, value },
    transaction,
    receipt,
    price
  };

  logger.info(data);

  return data;
};
