import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-PositionsConverted");

export const PositionsConverted: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [stakeholder, marketId, indexSet, amount] = parameters;

  logger.info(
    `Positions converted - Stakeholder: ${stakeholder}, Market: ${marketId}, Amount: ${amount}`
  );
};
