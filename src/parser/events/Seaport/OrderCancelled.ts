import { createLogger } from "../../../logger";
import { Event, TransferSingleEvent } from "@/types";

const logger = createLogger("Seaport-OrderCancelled");

export const OrderCancelled = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TransferSingleEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [orderHash, offerer, zone] = args;

  logger.info(`tx:${transactionHash} | order:${orderHash}`);

  const order = await getSeaportOrder(orderHash);
  if (!order) return;

  await fulfillSeaportOrder(orderHash);

  // Note: OpenSearch functionality removed - document updates are no longer performed

  async function getSeaportOrder(orderHash: string) {
    try {
      return await prisma.seaportOrder.findFirst({
        where: {
          order_hash: orderHash,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        // Handle not found error
        logger.warn(`orderHash: ${orderHash}: was not found.`);
      } else {
        // Handle other kinds of errors
        logger.error("Error finding order:", error);
      }
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

  return;
};
