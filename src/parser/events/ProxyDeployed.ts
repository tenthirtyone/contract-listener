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

  await prisma.collection.upsert({
    where: {
      address: proxyAddress,
      chain: options.chain,
    },
    update: {
      transaction_hash: transactionHash,
      transaction_state: "MINED",
    },
    create: {
      address: proxyAddress,
      chain: options.chain,
      transaction_hash: transactionHash,
      transaction_state: "MINED",
    },
  });

  return data;
};
