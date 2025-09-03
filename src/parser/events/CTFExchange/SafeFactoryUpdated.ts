import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-SafeFactoryUpdated");

interface SafeFactoryUpdatedData {
  oldSafeFactory: string;
  newSafeFactory: string;
}

interface SafeFactoryUpdatedEvent extends ParsedEvent {
  data: SafeFactoryUpdatedData;
}

export const SafeFactoryUpdated = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<SafeFactoryUpdatedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [oldSafeFactory, newSafeFactory] = args;

  const data: SafeFactoryUpdatedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      oldSafeFactory,
      newSafeFactory,
    },
    transaction,
    receipt,
  };

  logger.info(
    `Safe factory updated - Old: ${oldSafeFactory}, New: ${newSafeFactory}`
  );

  // TODO: Update safe factory configuration in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'safeFactory' }, data: { value: newSafeFactory } });

  return data;
};
