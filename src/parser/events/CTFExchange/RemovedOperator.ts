import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedOperator");


export const RemovedOperator: EventParserFunction = async (
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

  const [removedOperator, admin] = parameters;

  logger.info(`Operator removed - Address: ${removedOperator}, By: ${admin}`);

  // TODO: Update operator status in database
  // Note: Prisma is not available in library mode - use external database connections
};
