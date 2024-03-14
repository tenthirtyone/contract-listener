import { createLogger } from "../../logger";
import { Event, TokenMintEvent } from "../../types";

const logger = createLogger("TokenMint");

export const TokenMint = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any
): Promise<TokenMintEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const to = args[0];
  const tokenId = args[1].toNumber();
  const cid = args[2];

  const price = eventListener.price;

  const data: TokenMintEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { to, tokenId, cid },
    transaction,
    receipt,
    price,
  };

  logger.info(data);

  return data;
};
