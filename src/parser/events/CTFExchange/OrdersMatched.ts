import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrdersMatched");


export const OrdersMatched: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    transactionIndex,
    logIndex,
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


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "OrdersMatched", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update order status and handle matching data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash: takerOrderHash }, data: { matched: true } });
};
