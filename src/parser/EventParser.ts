import {
  ProxyDeployed,
  TokenMint,
  TransferSingle,
  OrderFulfilled,
  OrdersMatched,
  OrderCancelled,
  Transfer,
  FeeCharged,
  NewAdmin,
  NewOperator,
  OrderCancelled as CTFOrderCancelled,
  OrderFilled,
  OrdersMatched as CTFOrdersMatched,
  ProxyFactoryUpdated,
  RemovedAdmin,
  RemovedOperator,
  SafeFactoryUpdated,
  TokenRegistered,
  TradingPaused,
  TradingUnpaused,
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
    FeeCharged,
    NewAdmin,
    NewOperator,
    CTFOrderCancelled,
    OrderFilled,
    CTFOrdersMatched,
    ProxyFactoryUpdated,
    RemovedAdmin,
    RemovedOperator,
    SafeFactoryUpdated,
    TokenRegistered,
    TradingPaused,
    TradingUnpaused,
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
      FeeCharged,
      NewAdmin,
      NewOperator,
      CTFOrderCancelled,
      OrderFilled,
      CTFOrdersMatched,
      ProxyFactoryUpdated,
      RemovedAdmin,
      RemovedOperator,
      SafeFactoryUpdated,
      TokenRegistered,
      TradingPaused,
      TradingUnpaused,
    };
  }
}

export default EventParser;
