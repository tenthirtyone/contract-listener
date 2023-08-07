import { ProxyDeployed, TokenMint, TransferSingle } from "./events";
import { EventParser as TEventParser } from "@/types";

export function createEventParser(): TEventParser {
  return {
    ProxyDeployed,
    TokenMint,
    TransferSingle,
  };
}

export class EventParser {
  static create() {
    return {
      ProxyDeployed,
      TokenMint,
      TransferSingle,
    };
  }
}

export default EventParser;
