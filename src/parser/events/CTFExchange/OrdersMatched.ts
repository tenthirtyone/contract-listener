import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrdersMatched");

interface OrdersMatchedData {
  takerOrderHash: string;
  takerOrderMaker: string;
  makerAssetId: string;
  takerAssetId: string;
  makerAmountFilled: string;
  takerAmountFilled: string;
}

interface OrdersMatchedEvent extends ParsedEvent {
  data: OrdersMatchedData;
}

export const OrdersMatched = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<OrdersMatchedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [
    takerOrderHash,
    takerOrderMaker,
    makerAssetId,
    takerAssetId,
    makerAmountFilled,
    takerAmountFilled,
  ] = args;

  const data: OrdersMatchedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      takerOrderHash,
      takerOrderMaker,
      makerAssetId: makerAssetId.toString(),
      takerAssetId: takerAssetId.toString(),
      makerAmountFilled: makerAmountFilled.toString(),
      takerAmountFilled: takerAmountFilled.toString(),
    },
    transaction,
    receipt,
  };

  logger.info(
    `Orders matched - Taker Order: ${takerOrderHash}, Maker: ${takerOrderMaker}`
  );

  // TODO: Update order status and handle matching data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash: takerOrderHash }, data: { matched: true } });

  return data;
};
