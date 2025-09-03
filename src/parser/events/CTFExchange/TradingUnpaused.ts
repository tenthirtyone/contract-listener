import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingUnpaused");

interface TradingUnpausedData {
  pauser: string;
}

interface TradingUnpausedEvent extends ParsedEvent {
  data: TradingUnpausedData;
}

export const TradingUnpaused = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TradingUnpausedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [pauser] = args;

  const data: TradingUnpausedEvent = {
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

  logger.info(`Trading unpaused by: ${pauser}`);

  // TODO: Update trading status in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'tradingPaused' }, data: { value: false } });

  return data;
};
