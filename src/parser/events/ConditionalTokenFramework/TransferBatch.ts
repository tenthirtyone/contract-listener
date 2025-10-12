import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-TransferBatch");

export const TransferBatch: EventParserFunction = async (
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

  const [operator, from, to, ids, values] = parameters;

  logger.info(
    `Transfer batch - From: ${from}, To: ${to}, TokenIds: ${ids}, Values: ${values}`
  );

  // TODO: Track batch transfer in database
};
