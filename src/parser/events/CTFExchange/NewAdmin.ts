import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-NewAdmin");


export const NewAdmin: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [newAdminAddress, admin] = parameters;

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "NewAdmin", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Add database operations for admin tracking if needed
  // Note: Prisma is not available in library mode - use external database connections
};
