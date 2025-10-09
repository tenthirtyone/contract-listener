import { createLogger } from "../../../logger";
import { ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewAdmin");

export const NewAdmin = async (
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

  const [newAdminAddress, admin] = parameters;

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);

  // TODO: Add database operations for admin tracking if needed
  // For example: await prisma.admin.create({ data: { address: newAdminAddress, addedBy: admin } });
};
