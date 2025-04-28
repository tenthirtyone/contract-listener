import { createLogger } from "../../../logger";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("Seaport-OrderFulfilled");

export const OrderFulfilled = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TransferSingleEvent> => {
  const { prisma, opensearch, seaport } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [orderHash, offerer, zone, recipient, rawOffers, rawConsiderations] =
    args;

  logger.info(`tx:${transactionHash} | order:${orderHash}`);

  await fulfillSeaportOrder(orderHash);

  const offers = rawOffers.map((offer) => {
    const [offerItemType, offerToken, offerIdentifier, offerAmount] = offer;

    return {
      offerItemType,
      offerToken,
      offerIdentifier: offerIdentifier.toString(),
      offerAmount: offerAmount.toString(),
    };
  });

  const considerations = rawConsiderations.map((consideration) => {
    const [
      considerationItemType,
      considerationToken,
      considerationIdentifier,
      considerationAmount,
      considerationRecipient,
    ] = consideration;

    return {
      considerationItemType,
      considerationToken,
      considerationIdentifier: considerationIdentifier.toString(),
      considerationAmount: considerationAmount.toString(),
      considerationRecipient,
    };
  });

  for (const offer of offers) {
    //const document = await getDocument(offer.offerToken, offer.offerIdentifier);
    const document = await getDocument(offer.offerToken, offer.offerIdentifier);
    if (document) {
      // Remove the offer from the list of offers.
      document.offers = document.offers.filter((docOffer) => {
        const documentOrderHash = seaport.getOrderHash(docOffer.parameters);
        return documentOrderHash !== orderHash;
      });

      // put the document back in the index
      console.log("TEST RUN");
    } else {
      logger.warn(
        `Document not found for token ${offer.offerToken} and identifier ${offer.offerIdentifier}`
      );
    }
  }

  async function fulfillSeaportOrder(orderHash: string) {
    try {
      const beforeCount = await prisma.seaportOrder.count({
        where: {
          fulfilled: true,
        },
      });

      await prisma.seaportOrder.update({
        where: {
          order_hash: orderHash,
        },
        data: {
          fulfilled: true,
        },
      });
      logger.info("Order updated:", orderHash);

      const afterCount = await prisma.seaportOrder.count({
        where: {
          fulfilled: true,
        },
      });

      console.log(beforeCount);
      console.log(afterCount);
    } catch (error) {
      if (error.code === "P2025") {
        // Handle not found error
        logger.warn(`orderHash: ${orderHash}: was not found.`);
      } else {
        // Handle other kinds of errors
        logger.error("Error updating order:", error);
      }
    }
  }

  async function getDocument(
    tokenAddress: string,
    tokenId: string
  ): Promise<any> {
    try {
      const response = await opensearch.search({
        index: "landingpage",
        body: {
          query: {
            bool: {
              must: [
                { match: { token_address: tokenAddress } },
                { match: { token_id: tokenId } },
              ],
            },
          },
        },
      });

      // Assuming the document you need is the first hit
      return response.body.hits.hits.length > 0
        ? response.body.hits.hits[0]._source
        : null;
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  return;
};
