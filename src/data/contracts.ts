// This data will become the model for a db once it's refined
import { Contract } from "@/types";
import { abi } from "./BeaconABI"

export const mockContracts: Contract[] = [
  {
    address: "0x471A4b7de2FE71F44db772122320baB88bFb853C",
    type: "Beacon",
    abi,
  },
];
