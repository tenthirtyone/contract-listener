import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("GnosisSafeFactory-ProxyCreation");

export const ProxyCreation: EventParserFunction = async (
  evt,
  eventListener,
  transaction,
  receipt,
  context
): Promise<void> => {
  const { logger: contextLogger } = context;
  const { blockNumber, transactionHash, parameters } = evt;

  const [proxy, owner] = parameters;

  logger.info(`Proxy created - Proxy: ${proxy}, Owner: ${owner}`);
};
