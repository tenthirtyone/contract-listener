import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewOperator");

interface NewOperatorData {
  newOperatorAddress: string;
  admin: string;
}

interface NewOperatorEvent extends ParsedEvent {
  data: NewOperatorData;
}

export const NewOperator = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<NewOperatorEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [newOperatorAddress, admin] = args;

  const data: NewOperatorEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      newOperatorAddress,
      admin,
    },
    transaction,
    receipt,
  };

  logger.info(
    `New operator added - Address: ${newOperatorAddress}, By: ${admin}`
  );

  // TODO: Add database operations for operator tracking if needed
  // For example: await prisma.operator.create({ data: { address: newOperatorAddress, addedBy: admin } });

  return data;
};
