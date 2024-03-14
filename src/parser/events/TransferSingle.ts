import { createLogger } from "../../logger";
import { getTransactionData } from "@/utils";
import { Event, TransferSingleEvent } from "@/types";
import { ZERO_ADDRESS } from "@/constants";

const logger = createLogger("TransferSingle");

export const TransferSingle = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TransferSingleEvent> => {
  const { prisma, logger, options } = context;
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
    price,
  };

  if (from === ZERO_ADDRESS) {
    console.log("Token is minted");
    let sparseNft = await getSparseNft({
      chain: options.chain,
      address,
      identifier: tokenId.toString(),
      transaction_hash: transactionHash,
    });

    delete sparseNft.id;
    delete sparseNft.createdAt;
    delete sparseNft.updatedAt;

    await createNft({
      ...sparseNft,
      identifier: tokenId.toString(),
      chain: options.chain,
      transaction_hash: transactionHash,
    });
    // Create the new NFT record
    // update the ownership balance
  } else {
    // update the ownership balance
  }

  logger.info(data.data);
  logger.info(data);

  return data;

  async function getSparseNft({
    chain,
    address,
    identifier,
    transaction_hash,
  }) {
    return await prisma.sparseNft.findFirst({
      where: {
        chain,
        address,
        OR: [{ identifier }, { transaction_hash }],
      },
    });
  }

  async function createNft({
    chain,
    address,
    identifier,
    supply,
    name,
    image,
    transaction_hash,
    description,
    media,
    attributes,
    creator,
  }) {
    console.log({
      chain,
      address,
      identifier,
      supply,
      name,
      image,
      transaction_hash,
      description,
      media,
      attributes,
      creator,
    });
    return await prisma.nft.create({
      data: {
        identifier,
        supply,
        name,
        image,
        transaction_hash,
        description,
        media,
        attributes,
        creator,
        collection: {
          connect: {
            address_chain: {
              address,
              chain,
            },
          },
        },
      },
    });
  }
};
