import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-TransferSingle");

export const TransferSingle: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [operator, from, to, id, value] = parameters;

  logger.info(
    `Transfer single - From: ${from}, To: ${to}, TokenId: ${id}, Value: ${value}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "TransferSingle", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Track single transfer in database
};
