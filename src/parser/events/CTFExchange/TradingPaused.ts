import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingPaused");

export const TradingPaused = async (
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

  const [pauser] = parameters;

  logger.info(`Trading paused by: ${pauser}`);

  // TODO: Update trading status in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'tradingPaused' }, data: { value: true } });
};
