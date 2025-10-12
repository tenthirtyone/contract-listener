import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-ConditionResolution");

export const ConditionResolution: EventParserFunction = async (
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

  const [conditionId, oracle, questionId, outcomeSlotCount, payoutNumerators] =
    parameters;

  logger.info(
    `Condition resolved - ConditionId: ${conditionId}, Oracle: ${oracle}, Payouts: ${payoutNumerators}`
  );

  // TODO: Update condition resolution in database
};
