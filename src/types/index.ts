export type Contract = {
  address: string;
  type: string;
  abi: any;
};

export type EventParser = {
  [key: string]: (evt: any) => Object;
};

export type ListenerOptions = {
  providerUrl: string;
};

export type Webhook = {
  url: string;
};
