export type Contract = {
  address: string;
  type: string;
};

export type ListenerOptions = {
  providerUrl: string;
  contracts: Contract[];
};
