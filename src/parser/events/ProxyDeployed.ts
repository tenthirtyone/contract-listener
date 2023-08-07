

import { createLogger } from "@/logger";
import { Event, ProxyDeployedEvent } from "@/types";
import { abi } from "@/data/TokenABI"
const logger = createLogger("ProxyDeployed");

export const ProxyDeployed = (evt: Event, eventListener: any): ProxyDeployedEvent => {
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
  console.log(eventListener)

  eventListener.addContract(proxyAddress, abi);
  return data;
};
