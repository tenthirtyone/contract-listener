import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-ApprovalForAll");

export const ApprovalForAll: EventParserFunction = async (
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

  const [owner, operator, approved] = parameters;

  logger.info(
    `Approval for all - Owner: ${owner}, Operator: ${operator}, Approved: ${approved}`
  );

  // TODO: Track approval in database
};
