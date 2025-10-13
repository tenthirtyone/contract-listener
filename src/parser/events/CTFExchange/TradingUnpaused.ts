import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-TradingUnpaused");


export const TradingUnpaused: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [pauser] = parameters;

  logger.info(`Trading unpaused by: ${pauser}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("CTFExchange", "TradingUnpaused", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Update trading status in database
  // Note: Prisma is not available in library mode - use external database connections
};
