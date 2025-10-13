import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-AuthorizedUser");

export const AuthorizedUser: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [usr] = parameters;

  logger.info(`User authorized - Address: ${usr}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV1", "AuthorizedUser", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }
};
