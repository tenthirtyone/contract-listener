import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-AncillaryDataUpdated");

export const AncillaryDataUpdated: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [questionID, owner, update] = parameters;

  logger.info(
    `Ancillary data updated - Question: ${questionID}, Owner: ${owner}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("UMACTFAdapterV3", "AncillaryDataUpdated", options.chain, {
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
