import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-ConditionPreparation");

export const ConditionPreparation: EventParserFunction = async (
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

  const [conditionId, oracle, questionId, outcomeSlotCount] = parameters;

  logger.info(
    `Condition prepared - ConditionId: ${conditionId}, Oracle: ${oracle}, QuestionId: ${questionId}, OutcomeSlots: ${outcomeSlotCount}`
  );

  // TODO: Store condition preparation in database
};
