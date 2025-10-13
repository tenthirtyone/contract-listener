import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-ConditionPreparation");

export const ConditionPreparation: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    parameters,
  } = evt;

  const [conditionId, oracle, questionId, outcomeSlotCount] = parameters;

  logger.info(
    `Condition prepared - ConditionId: ${conditionId}, Oracle: ${oracle}, QuestionId: ${questionId}, OutcomeSlots: ${outcomeSlotCount}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "ConditionPreparation", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Store condition preparation in database
};
