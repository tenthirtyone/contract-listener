import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("NegRiskAdapter-NewAdmin");

export const NewAdmin: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [admin, newAdminAddress] = parameters;

  logger.info(`New admin added - Address: ${newAdminAddress}, By: ${admin}`);
};
