import { createLogger } from "../../logger";
import { getTransactionData } from "@/utils";
import { Event, TransferSingleEvent } from "@/types";

// ERC721 Transfer Event

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const logger = createLogger("Transfer");

export const Transfer = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<any> => {
  const { prisma, logger, options } = context;
  console.log(evt);
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const from = args[0];
  const to = args[1];
  const tokenId = args[2].toNumber();

  console.log(from);
  console.log(to);
  console.log(tokenId);
  console.log(receipt);

  const price = eventListener.price;

  const data: any = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { from, to, tokenId },
    transaction,
    receipt,
    price,
  };
  logger.info("ERC721 Transfer Event");

  if (from === ZERO_ADDRESS) {
    try {
      let sparseNft = await getSparseNft({
        chain: options.chain,
        address,
        identifier: tokenId.toString(),
        transaction_hash: transactionHash,
      });

      // If this is a lazy mint token, the data will already exist
      if (sparseNft) {
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
      }

      await updateOrCreateBalance({
        chain: options.chain,
        token_address: address,
        identifier: tokenId.toString(),
        user_address: to,
        incrementBy: 1,
      });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  } else {
    try {
      // update the ownership balance
      await updateOrCreateBalance({
        chain: options.chain,
        token_address: address,
        identifier: tokenId.toString(),
        user_address: to,
        incrementBy: 1,
      });
      await updateOrCreateBalance({
        chain: options.chain,
        token_address: address,
        identifier: tokenId.toString(),
        user_address: from,
        incrementBy: -1,
      });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  return null;

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
        },
      });
    }
  }
};
