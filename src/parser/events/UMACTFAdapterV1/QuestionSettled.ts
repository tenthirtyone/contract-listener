import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("UMACTFAdapterV1-QuestionSettled");

export const QuestionSettled: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [questionID, settledPrice, earlyResolution] = parameters;

  logger.info(
    `Question settled - ID: ${questionID}, Price: ${settledPrice}, Early: ${earlyResolution}`
  );
};
