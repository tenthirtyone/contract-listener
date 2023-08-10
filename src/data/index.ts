export * from "./contracts";
export * from "./webhooks";

import { abi } from "./BeaconABI";
import { abi as TokenABI } from "./MultiTokenContract.json"

export const ABIs = {
  "Beacon": abi,
  "ERC1155": TokenABI
}