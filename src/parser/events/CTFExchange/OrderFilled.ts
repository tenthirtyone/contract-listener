import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderFilled");

export const OrderFilled = async (
  evt: ParsedEvent,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<void> => {
  const { prisma } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    parameters,
  } = evt;

  const [
    orderHash,
    maker,
    taker,
    makerAssetId,
    takerAssetId,
    makerAmountFilled,
    takerAmountFilled,
    fee,
  ] = parameters;

  logger.info(
    `Order filled - Hash: ${orderHash}, Maker: ${maker}, Taker: ${taker}`
  );

  // TODO: Update order status in database and handle trade data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash }, data: { filled: true } });
  // await prisma.ctfTrade.create({ data: { ... } });
};
