import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-PayoutRedemption");

export const PayoutRedemption: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [redeemer, conditionId, amounts, payout] = parameters;

  logger.info(
    `Payout redeemed - Redeemer: ${redeemer}, Condition: ${conditionId}, Payout: ${payout}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "PayoutRedemption", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }
};
