import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewOperator");


export const NewOperator: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [newOperatorAddress, admin] = parameters;

  logger.info(
    `New operator added - Address: ${newOperatorAddress}, By: ${admin}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "NewOperator", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Add database operations for operator tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
