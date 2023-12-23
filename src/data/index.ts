export * from "./contracts";
export * from "./webhooks";

import { abi } from "./BeaconABI";
import { abi as TokenABI } from "./MultiTokenContract.json";
import SeaportABI from "./seaportAbi.json";

export const ABIs = {
  Beacon: abi,
  ERC1155: TokenABI,
  seaport15: SeaportABI,
};
