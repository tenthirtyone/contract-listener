import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrdersMatched");

export const OrdersMatched = async (
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
    takerOrderHash,
    takerOrderMaker,
    makerAssetId,
    takerAssetId,
    makerAmountFilled,
    takerAmountFilled,
  ] = parameters;

  logger.info(
    `Orders matched - Taker Order: ${takerOrderHash}, Maker: ${takerOrderMaker}`
  );

  // TODO: Update order status and handle matching data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash: takerOrderHash }, data: { matched: true } });
};
