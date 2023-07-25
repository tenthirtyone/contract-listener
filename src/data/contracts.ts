// This data will become the model for a db once it's refined
import { Contract } from "@/types";
import { abi } from "./MultiTokenContract.json";

export const mockContracts: Contract[] = [
  {
    address: "0xcc7Ac760b5195C2506bD6E882fe2A53E7C394fFC",
    type: "1155",
    abi,
  },
];
