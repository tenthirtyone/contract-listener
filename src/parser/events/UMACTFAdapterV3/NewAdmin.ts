import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-NewAdmin");

export const NewAdmin: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [admin, newAdminAddress] = parameters;

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV3", "NewAdmin", options.chain, {
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
