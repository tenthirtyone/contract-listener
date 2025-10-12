import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TokenRegistered");


export const TokenRegistered: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
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
  // Note: Prisma is not available in library mode - use external database connections
};
