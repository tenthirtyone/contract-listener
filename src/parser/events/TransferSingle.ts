import { createLogger } from "@/logger";

const logger = createLogger("TransferSingle");

export const TransferSingle = (evt) => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const operator = args[0];
  const from = args[1];
  const to = args[2];
  const id = args[3].toNumber();
  const value = args[4].toNumber();

  const data = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    operator,
    from,
    to,
    id,
    value,
  };

  logger.info(data);

  return data;
};
