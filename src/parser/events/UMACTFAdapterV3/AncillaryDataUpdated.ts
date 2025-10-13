import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV3-AncillaryDataUpdated");

export const AncillaryDataUpdated: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID, owner, update] = parameters;

  logger.info(
    `Ancillary data updated - Question: ${questionID}, Owner: ${owner}`
  );
};
