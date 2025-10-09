import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedOperator");

export const RemovedOperator = async (
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

  const [removedOperator, admin] = parameters;

  logger.info(`Operator removed - Address: ${removedOperator}, By: ${admin}`);

  // TODO: Update operator status in database
  // For example: await prisma.operator.update({ where: { address: removedOperator }, data: { active: false } });
};
