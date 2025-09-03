import { createLogger } from "../../../logger";
import { Event, ParsedEvent } from "../../../types";

const logger = createLogger("CTFExchange-ProxyFactoryUpdated");

interface ProxyFactoryUpdatedData {
  oldProxyFactory: string;
  newProxyFactory: string;
}

interface ProxyFactoryUpdatedEvent extends ParsedEvent {
  data: ProxyFactoryUpdatedData;
}

export const ProxyFactoryUpdated = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<ProxyFactoryUpdatedEvent> => {
  const { prisma } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;

  const [oldProxyFactory, newProxyFactory] = args;

  const data: ProxyFactoryUpdatedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: {
      oldProxyFactory,
      newProxyFactory,
    },
    transaction,
    receipt,
  };

  logger.info(
    `Proxy factory updated - Old: ${oldProxyFactory}, New: ${newProxyFactory}`
  );

  // TODO: Update proxy factory configuration in database
  // For example: await prisma.ctfConfig.update({ where: { key: 'proxyFactory' }, data: { value: newProxyFactory } });

  return data;
};
