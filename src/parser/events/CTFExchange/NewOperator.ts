import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewOperator");


export const NewOperator: EventParserFunction = async (
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

  const [newOperatorAddress, admin] = parameters;

  logger.info(
    `New operator added - Address: ${newOperatorAddress}, By: ${admin}`
  );

  // TODO: Add database operations for operator tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
