import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingUnpaused");

export const TradingUnpaused = async (
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

  logger.info(`Trading unpaused by: ${pauser}`);

  // TODO: Update trading status in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'tradingPaused' }, data: { value: false } });
};
