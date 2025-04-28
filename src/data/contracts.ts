// This data will become the model for a db once it's refined
import { Contract } from "../types";
import { abi } from "./BeaconABI";
import { abi as TokenABI } from "./MultiTokenContract.json";

export const mockContracts: Contract[] = [
  {
    address: "0x471A4b7de2FE71F44db772122320baB88bFb853C",
    type: "Beacon",
    abi,
  },
  {
    address: "0xEDfA45603964b7b29481B34B519862567c3D579A",
    type: "1155",
    abi: TokenABI,
  },
];

export const BEACON_CONTRACT = {
  address: "0x471A4b7de2FE71F44db772122320baB88bFb853C",
  type: "Beacon",
  abi,
};
