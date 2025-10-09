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
};

export type Webhook = {
  url: string;
};

export type BlockchainEvent = {
  blockNumber: number;
  blockHash: string;
  address: string;
  transactionHash: string;
  event: string;
  args: any;
  logIndex: number;
  transactionIndex: number;
  data?: string;
  topics?: string[];
  chainId?: number;
};

// Legacy alias for backward compatibility
export type Event = BlockchainEvent;

export interface ParsedEvent {
  blockNumber: number;
  blockHash: string;
  address: string;
  transactionHash: string;
  event: string;
  data: any;
  parameters: any;
  transaction?: any;
  receipt?: any;
  price?: number;
}

// Removed non-CTFExchange event interfaces - only CTFExchange functionality kept

export type EthereumAddress = string;

export type DatabaseKey = EthereumAddress | `${EthereumAddress}:${number}`;
