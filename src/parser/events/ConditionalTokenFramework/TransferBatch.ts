import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-TransferBatch");

export const TransferBatch: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [operator, from, to, ids, values] = parameters;

  logger.info(
    `Transfer batch - From: ${from}, To: ${to}, TokenIds: ${ids}, Values: ${values}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "TransferBatch", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Track batch transfer in database
};
