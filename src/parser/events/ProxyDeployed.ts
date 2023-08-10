

import { createLogger } from "@/logger";
import { Event, ProxyDeployedEvent } from "@/types";

const logger = createLogger("ProxyDeployed");

const TYPE = "ERC1155";

export const ProxyDeployed = async (evt: Event, eventListener: any): Promise<ProxyDeployedEvent> => {
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const proxyAddress = args[0];

  const data: ProxyDeployedEvent = {
    blockNumber,
    blockHash,
    address,
    transactionHash,
    event,
    data: { address: proxyAddress },
  };

  logger.info(data);

  await eventListener.addContract(proxyAddress, TYPE);
  return data;
};
