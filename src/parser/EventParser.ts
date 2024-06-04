import {
  ProxyDeployed,
  TokenMint,
  TransferSingle,
  OrderFulfilled,
  OrdersMatched,
  OrderCancelled,
  Transfer,
} from "./events";
import { EventParser as TEventParser } from "../types";

export function createEventParser(): TEventParser {
  return {
    ProxyDeployed,
    TokenMint,
    TransferSingle,
    OrderFulfilled,
    OrdersMatched,
    OrderCancelled,
    Transfer,
  };
}

export class EventParser {
  static create() {
    return {
      ProxyDeployed,
      TokenMint,
      TransferSingle,
      OrderFulfilled,
      OrdersMatched,
      OrderCancelled,
      Transfer,
    };
  }
}

export default EventParser;
