import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TokenRegistered");


export const TokenRegistered: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    parameters,
  } = evt;

  const [token0, token1, conditionId] = parameters;

  logger.info(
    `Token registered - Token0: ${token0}, Token1: ${token1}, ConditionId: ${conditionId}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "TokenRegistered", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Store token registration in database
  // Note: Prisma is not available in library mode - use external database connections
};
