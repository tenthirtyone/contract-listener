

import { createLogger } from "@/logger";
import { Event, ProxyDeployedEvent } from "@/types";

const logger = createLogger("ProxyDeployed");

const TYPE = "ERC1155";

export const ProxyDeployed = async (evt: Event, eventListener: any, transaction: any, receipt: any): Promise<ProxyDeployedEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const proxyAddress = args[0];

  const price = eventListener.price;

  const data: ProxyDeployedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { address: proxyAddress },
    transaction,
    receipt,
    price
  };

  logger.info(data);

  await eventListener.addContract(proxyAddress, TYPE);
  return data;
};
