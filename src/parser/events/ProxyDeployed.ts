import { Event, ProxyDeployedEvent } from "../../types";

const TYPE = "ERC1155";

export const ProxyDeployed = async (
  evt: Event,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
): Promise<ProxyDeployedEvent> => {
  const { prisma, logger, options } = context;
  const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
  const proxyAddress = args[0];

  await eventListener.addContract(proxyAddress, TYPE);

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
    price,
  };

  logger.info(`Update ${proxyAddress} for chain ${options.chain} mined.`);

  await prisma.collection.update({
    where: {
      address_chain: {
        address: proxyAddress,
        chain: options.chain,
      },
    },
    data: {
      transaction_hash: transactionHash,
      transaction_state: "MINED",
    },
  });

  return data;
};
