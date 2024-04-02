import { createLogger } from "../../logger";
import { getTransactionData } from "@/utils";
import { Event, TransferSingleEvent } from "@/types";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
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

    await incrementCollectionSupply({
      chain: options.chain,
      address,
    });

    await updateOrCreateBalance({
      chain: options.chain,
      token_address: address,
      identifier: tokenId.toString(),
      user_address: to,
      incrementBy: value,
    });
  } else {
    // update the ownership balance
    await updateOrCreateBalance({
      chain: options.chain,
      token_address: address,
      identifier: tokenId.toString(),
      user_address: to,
      incrementBy: value,
    });
    await updateOrCreateBalance({
      chain: options.chain,
      token_address: address,
      identifier: tokenId.toString(),
      user_address: from,
      incrementBy: -value,
    });
  }

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

  async function incrementCollectionSupply({ chain, address }) {
    return await prisma.collection.update({
      where: {
        address_chain: {
          address,
          chain,
        },
      },
      data: {
        total_supply: {
          increment: 1,
        },
      },
    });
  }

  async function updateOrCreateBalance({
    chain,
    token_address,
    identifier,
    user_address,
    incrementBy,
  }) {
    // Try to find an existing balance record
    const existingBalance = await prisma.nftOwners.findUnique({
      where: {
        chain_token_address_identifier_user_address: {
          chain,
          token_address,
          identifier,
          user_address,
        },
      },
    });

    if (existingBalance) {
      // If found, increment the balance
      return await prisma.nftOwners.update({
        where: {
          chain_token_address_identifier_user_address: {
            chain,
            token_address,
            identifier,
            user_address,
          },
        },
        data: {
          balance: {
            increment: incrementBy,
          },
        },
      });
    } else {
      // If not found, create a new balance record
      return await prisma.nftOwners.create({
        data: {
          chain,
          token_address,
          identifier,
          user_address,
          balance: incrementBy,
          // Assuming the Nft relation can be directly connected or needs to be created
          // Similarly for User, if it's a known user, connect using user_address
        },
      });
    }
  }
};
