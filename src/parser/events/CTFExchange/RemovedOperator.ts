import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedOperator");

interface RemovedOperatorData {
  removedOperator: string;
  admin: string;
}

interface RemovedOperatorEvent extends ParsedEvent {
  data: RemovedOperatorData;
}

export const RemovedOperator = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<RemovedOperatorEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [removedOperator, admin] = args;

  const data: RemovedOperatorEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      removedOperator,
      admin,
    },
    transaction,
    receipt,
  };

  logger.info(`Operator removed - Address: ${removedOperator}, By: ${admin}`);

  // TODO: Update operator status in database
  // For example: await prisma.operator.update({ where: { address: removedOperator }, data: { active: false } });

  return data;
};
