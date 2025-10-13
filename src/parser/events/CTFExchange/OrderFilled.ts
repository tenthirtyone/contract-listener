import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-OrderFilled");

export const OrderFilled: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "OrderFilled", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters: {
        orderHash,
        maker,
        taker,
        makerAssetId,
        takerAssetId,
        makerAmountFilled,
        takerAmountFilled,
        fee,
      },
    });
  }

  // TODO: Update order status in database and handle trade data
  // For example:
  // await prisma.ctfOrder.update({ where: { orderHash }, data: { filled: true } });
  // await prisma.ctfTrade.create({ data: { ... } });
};
