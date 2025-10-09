import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-SafeFactoryUpdated");

export const SafeFactoryUpdated = async (
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

  const [oldSafeFactory, newSafeFactory] = parameters;

  logger.info(
    `Safe factory updated - Old: ${oldSafeFactory}, New: ${newSafeFactory}`
  );

  // TODO: Update safe factory configuration in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'safeFactory' }, data: { value: newSafeFactory } });
};
