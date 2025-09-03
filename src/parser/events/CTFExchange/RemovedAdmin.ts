import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedAdmin");

interface RemovedAdminData {
  removedAdmin: string;
  admin: string;
}

interface RemovedAdminEvent extends ParsedEvent {
  data: RemovedAdminData;
}

export const RemovedAdmin = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<RemovedAdminEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [removedAdmin, admin] = args;

  const data: RemovedAdminEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      removedAdmin,
      admin,
    },
    transaction,
    receipt,
  };

  logger.info(`Admin removed - Address: ${removedAdmin}, By: ${admin}`);

  // TODO: Update admin status in database
  // For example: await prisma.admin.update({ where: { address: removedAdmin }, data: { active: false } });

  return data;
};
