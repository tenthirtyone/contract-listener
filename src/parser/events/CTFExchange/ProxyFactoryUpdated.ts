import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-ProxyFactoryUpdated");

export const ProxyFactoryUpdated = async (
  evt: ParsedEvent,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<void> => {
  const { prisma } = context;
  const {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    parameters,
  } = evt;

  const [oldProxyFactory, newProxyFactory] = parameters;

  logger.info(
    `Proxy factory updated - Old: ${oldProxyFactory}, New: ${newProxyFactory}`
  );

  // TODO: Update proxy factory configuration in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'proxyFactory' }, data: { value: newProxyFactory } });
};
