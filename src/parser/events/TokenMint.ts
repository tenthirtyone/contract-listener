import { createLogger } from "@/logger";
import { Event, TokenMintEvent } from "@/types";

const logger = createLogger("TokenMint");

export const TokenMint = (evt: Event): TokenMintEvent => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const to = args[0];
  const tokenId = args[1].toNumber();
  const cid = args[2];

  const data: TokenMintEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { to, tokenId, cid },
  };

  logger.info(data);

  return data;
};
