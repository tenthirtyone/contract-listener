import { createLogger } from "@/logger";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("TransferSingle");

export const TransferSingle = (evt: Event): TransferSingleEvent => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const operator = args[0];
  const from = args[1];
  const to = args[2];
  const tokenId = args[3].toNumber();
  const value = args[4].toNumber();

  const data: TransferSingleEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { operator, from, to, tokenId, value },
  };

  logger.info(data);

  return data;
};
