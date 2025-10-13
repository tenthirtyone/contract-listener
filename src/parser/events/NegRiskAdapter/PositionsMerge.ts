import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-PositionsMerge");

export const PositionsMerge: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [stakeholder, conditionId, amount] = parameters;

  logger.info(
    `Positions merged - Stakeholder: ${stakeholder}, Condition: ${conditionId}, Amount: ${amount}`
  );
};
