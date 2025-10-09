import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TokenRegistered");

export const TokenRegistered = async (
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

  const [token0, token1, conditionId] = parameters;

  logger.info(
    `Token registered - Token0: ${token0}, Token1: ${token1}, ConditionId: ${conditionId}`
  );

  // TODO: Store token registration in database
  // For example: await prisma.ctfTokenPair.create({ data: { token0, token1, conditionId } });
};
