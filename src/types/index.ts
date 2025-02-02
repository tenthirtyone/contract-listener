export type Contract = {
  address: string;
  type: string;
  abi: any;
};

export type EventParser = {
  [key: string]: (
    evt: any,
    eventListener: any,
    transaction: any,
    receipt: any,
    context: EnvironmentContext
  ) => Object;
};

type EnvironmentContext = {
  prisma: any;
  logger: any;
  options: ListenerOptions;
};

export type ListenerOptions = {
  name: string;
  chain: number;
  providerUrl: string;
  opensearchUser: string;
  opensearchPass: string;
  opensearchNode: string;
};

export type Webhook = {
  url: string;
};

export type Event = {
  blockNumber: number;
  blockHash: string;
  address: string;
  transactionHash: string;
  event: string;
  args: any;
};

export interface ParsedEvent {
  blockNumber: number;
  blockHash: string;
  address: string;
  transactionHash: string;
  event: string;
  data: any;
  transaction?: any;
  receipt?: any;
  price?: number;
}

export interface TokenMintEvent extends ParsedEvent {
  data: {
    to: string;
    tokenId: number;
    cid: string;
  };
}
export interface ProxyDeployedEvent extends ParsedEvent {
  data: {
    address: string;
  };
}
export interface TransferSingleEvent extends ParsedEvent {
  data: {
    operator: string;
    from: string;
    to: string;
    tokenId: number;
    value: number;
  };
}

export type EthereumAddress = string;

export type DatabaseKey = EthereumAddress | `${EthereumAddress}:${number}`;
