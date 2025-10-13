import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-PositionsMerge");

export const PositionsMerge: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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
    `Positions merged - Stakeholder: ${stakeholder}, ConditionId: ${conditionId}, Amount: ${amount}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "PositionsMerge", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Track position merge in database
};
