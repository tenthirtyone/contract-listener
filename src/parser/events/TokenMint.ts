import { createLogger } from "@/logger";

const logger = createLogger("TokenMint");

export const TokenMint = (evt) => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const to = args[0];
  const tokenId = args[1].toNumber();
  const cid = args[2];

  const data = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    to,
    tokenId,
    cid,
  };

  logger.info(data);

  return data;
};
