import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-NewFinderAddress");

export const NewFinderAddress: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [oldFinder, newFinder] = parameters;

  logger.info(`Finder address updated - Old: ${oldFinder}, New: ${newFinder}`);
};
