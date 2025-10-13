import { createLogger } from "../../../logger";
import { EventParserFunction } from "../../../types";

const logger = createLogger("GnosisSafeFactory-ProxyCreation");

export const ProxyCreation: EventParserFunction = async (evt, eventListener, context): Promise<void> => {
  const { logger: contextLogger, kafka, options } = context;
  const { blockNumber,
    blockHash,
    address, transactionHash,
    transactionIndex,
    logIndex, parameters } = evt;

  const [proxy, owner] = parameters;

  logger.info(`Proxy created - Proxy: ${proxy}, Owner: ${owner}`);


  // Publish to Kafka
  if (kafka) {
    await kafka.publishEvent("GnosisSafeFactory", "ProxyCreation", options.chain, {
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
