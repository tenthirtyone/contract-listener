import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("ConditionalTokenFramework-PayoutRedemption");

export const PayoutRedemption: EventParserFunction = async (
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

  // TODO: Track payout redemption in database
};
