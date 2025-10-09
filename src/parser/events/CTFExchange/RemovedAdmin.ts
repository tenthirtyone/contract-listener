import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedAdmin");

export const RemovedAdmin = async (
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

  const [removedAdmin, admin] = parameters;

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);

  // TODO: Update admin status in database
  // For example: await prisma.admin.update({ where: { address: removedAdmin }, data: { active: false } });
};
