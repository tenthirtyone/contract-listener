import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TokenRegistered");

interface TokenRegisteredData {
  token0: string;
  token1: string;
  conditionId: string;
}

interface TokenRegisteredEvent extends ParsedEvent {
  data: TokenRegisteredData;
}

export const TokenRegistered = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<TokenRegisteredEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [token0, token1, conditionId] = args;

  const data: TokenRegisteredEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      token0: token0.toString(),
      token1: token1.toString(),
      conditionId,
    },
    transaction,
    receipt,
  };

  logger.info(
    `Token registered - Token0: ${token0}, Token1: ${token1}, ConditionId: ${conditionId}`
  );

  // TODO: Store token registration in database
  // For example: await prisma.ctfTokenPair.create({ data: { token0, token1, conditionId } });

  return data;
};
