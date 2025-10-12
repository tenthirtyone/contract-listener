import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-PositionsMerge");

export const PositionsMerge: EventParserFunction = async (
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

  // TODO: Track position merge in database
};
