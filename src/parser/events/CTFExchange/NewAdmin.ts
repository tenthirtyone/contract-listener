import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewAdmin");

interface NewAdminData {
  newAdminAddress: string;
  admin: string;
}

interface NewAdminEvent extends ParsedEvent {
  data: NewAdminData;
}

export const NewAdmin = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<NewAdminEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [newAdminAddress, admin] = args;

  const data: NewAdminEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      newAdminAddress,
      admin,
    },
    transaction,
    receipt,
  };

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);

  // TODO: Add database operations for admin tracking if needed
  // For example: await prisma.admin.create({ data: { address: newAdminAddress, addedBy: admin } });

  return data;
};
