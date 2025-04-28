export * from "./contracts";
export * from "./webhooks";

import { abi } from "./BeaconABI";
import { abi as TokenABI } from "./MultiTokenContract.json";
import { abi as ERC721ABI } from "./ERC721ABI";
import SeaportABI from "./seaportAbi.json";

export const ABIs = {
  Beacon: abi,
  ERC1155: TokenABI,
  ERC721: ERC721ABI,
  seaport15: SeaportABI,
};
