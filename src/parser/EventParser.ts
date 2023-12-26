import {
  ProxyDeployed,
  TokenMint,
  TransferSingle,
  OrderFulfilled,
  OrdersMatched,
  OrderCancelled,
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
    };
  }
}

export default EventParser;
