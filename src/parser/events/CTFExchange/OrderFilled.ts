import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderFilled");

interface OrderFilledData {
  orderHash: string;
  maker: string;
  taker: string;
  makerAssetId: string;
  takerAssetId: string;
  makerAmountFilled: string;
  takerAmountFilled: string;
  fee: string;
}

interface OrderFilledEvent extends ParsedEvent {
  data: OrderFilledData;
}

export const OrderFilled = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<OrderFilledEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [
    orderHash,
    maker,
    taker,
    makerAssetId,
    takerAssetId,
    makerAmountFilled,
    takerAmountFilled,
    fee,
  ] = args;

  const data: OrderFilledEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      orderHash,
      maker,
      taker,
      makerAssetId: makerAssetId.toString(),
      takerAssetId: takerAssetId.toString(),
      makerAmountFilled: makerAmountFilled.toString(),
      takerAmountFilled: takerAmountFilled.toString(),
      fee: fee.toString(),
    },
    transaction,
    receipt,
  };

  logger.info(
    `Order filled - Hash: ${orderHash}, Maker: ${maker}, Taker: ${taker}`
  );

  // TODO: Update order status in database and handle trade data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash }, data: { filled: true } });
  // await prisma.ctfTrade.create({ data: { ... } });

  return data;
};
