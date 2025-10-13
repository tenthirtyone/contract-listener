import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-PositionSplit");

export const PositionSplit: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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

  const [
    stakeholder,
    collateralToken,
    parentCollectionId,
    conditionId,
    partition,
    amount,
  ] = parameters;

  logger.info(
    `Position split - Stakeholder: ${stakeholder}, ConditionId: ${conditionId}, Amount: ${amount}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "PositionSplit", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Track position split in database
};
