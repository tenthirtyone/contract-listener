import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-PayoutRedemption");

export const PayoutRedemption: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
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
    redeemer,
    collateralToken,
    parentCollectionId,
    conditionId,
    indexSets,
    payout,
  ] = parameters;

  logger.info(
    `Payout redeemed - Redeemer: ${redeemer}, CollateralToken: ${collateralToken}, Payout: ${payout}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("ConditionalTokenFramework", "PayoutRedemption", options.chain, {
      blockNumber,
      blockHash,
      address,
      transactionHash,
      transactionIndex,
      logIndex,
      parameters,
    });
  }

  // TODO: Track payout redemption in database
};
