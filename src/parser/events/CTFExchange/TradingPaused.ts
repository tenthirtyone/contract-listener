import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingPaused");

interface TradingPausedData {
  pauser: string;
}

interface TradingPausedEvent extends ParsedEvent {
  data: TradingPausedData;
}

export const TradingPaused = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TradingPausedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [pauser] = args;

  const data: TradingPausedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      pauser,
    },
    transaction,
    receipt,
  };

  logger.info(`Trading paused by: ${pauser}`);

  // TODO: Update trading status in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'tradingPaused' }, data: { value: true } });

  return data;
};
