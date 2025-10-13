import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-PayoutRedemption");

export const PayoutRedemption: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [redeemer, conditionId, amounts, payout] = parameters;

  logger.info(
    `Payout redeemed - Redeemer: ${redeemer}, Condition: ${conditionId}, Payout: ${payout}`
  );
};
