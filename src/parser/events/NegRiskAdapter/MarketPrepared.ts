import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-MarketPrepared");

export const MarketPrepared: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [marketId, oracle, feeBips, data] = parameters;

  logger.info(
    `Market prepared - ID: ${marketId}, Oracle: ${oracle}, Fee: ${feeBips}`
  );
};
