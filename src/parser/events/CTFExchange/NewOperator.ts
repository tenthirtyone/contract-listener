import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewOperator");

export const NewOperator = async (
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

  const [newOperatorAddress, admin] = parameters;

  logger.info(
    `New operator added - Address: ${newOperatorAddress}, By: ${admin}`
  );

  // TODO: Add database operations for operator tracking if needed
  // For example: await prisma.operator.create({ data: { address: newOperatorAddress, addedBy: admin } });
};
