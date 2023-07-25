import { TokenMint, TransferSingle } from "./events";
import { EventParser as TEventParser } from "@/types";

export function createEventParser(): TEventParser {
  return {
    TokenMint,
    TransferSingle,
  };
}

export class EventParser {
  static create() {
    return {
      TokenMint,
      TransferSingle,
    };
  }
}

export default EventParser;
