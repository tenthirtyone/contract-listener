import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-TransferSingle");

export const TransferSingle: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    parameters,
  } = evt;

  const [operator, from, to, id, value] = parameters;

  logger.info(
    `Transfer single - From: ${from}, To: ${to}, TokenId: ${id}, Value: ${value}`
  );

  // TODO: Track single transfer in database
};
