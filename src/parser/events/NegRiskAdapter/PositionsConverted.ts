import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-PositionsConverted");

export const PositionsConverted: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [stakeholder, marketId, indexSet, amount] = parameters;

  logger.info(
    `Positions converted - Stakeholder: ${stakeholder}, Market: ${marketId}, Amount: ${amount}`
  );


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("NegRiskAdapter", "PositionsConverted", options.chain, {
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
