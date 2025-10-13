import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-RemovedOperator");


export const RemovedOperator: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [removedOperator, admin] = parameters;

  logger.info(`Operator removed - Address: ${removedOperator}, By: ${admin}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "RemovedOperator", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update operator status in database
  // Note: Prisma is not available in library mode - use external database connections
};
