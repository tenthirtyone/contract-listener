"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = exports.createEventParser = void 0;
const events_1 = require("./events");
function createEventParser() {
    return {
        ProxyDeployed: events_1.ProxyDeployed,
        TokenMint: events_1.TokenMint,
        TransferSingle: events_1.TransferSingle,
        OrderFulfilled: events_1.OrderFulfilled,
        OrdersMatched: events_1.OrdersMatched,
        OrderCancelled: events_1.OrderCancelled,
        Transfer: events_1.Transfer,
        FeeCharged: events_1.FeeCharged,
        NewAdmin: events_1.NewAdmin,
        NewOperator: events_1.NewOperator,
        CTFOrderCancelled: events_1.OrderCancelled,
        OrderFilled: events_1.OrderFilled,
        CTFOrdersMatched: events_1.OrdersMatched,
        ProxyFactoryUpdated: events_1.ProxyFactoryUpdated,
        RemovedAdmin: events_1.RemovedAdmin,
        RemovedOperator: events_1.RemovedOperator,
        SafeFactoryUpdated: events_1.SafeFactoryUpdated,
        TokenRegistered: events_1.TokenRegistered,
        TradingPaused: events_1.TradingPaused,
        TradingUnpaused: events_1.TradingUnpaused,
    };
}
exports.createEventParser = createEventParser;
class EventParser {
    static create() {
        return {
            ProxyDeployed: events_1.ProxyDeployed,
            TokenMint: events_1.TokenMint,
            TransferSingle: events_1.TransferSingle,
            OrderFulfilled: events_1.OrderFulfilled,
            OrdersMatched: events_1.OrdersMatched,
            OrderCancelled: events_1.OrderCancelled,
            Transfer: events_1.Transfer,
            FeeCharged: events_1.FeeCharged,
            NewAdmin: events_1.NewAdmin,
            NewOperator: events_1.NewOperator,
            CTFOrderCancelled: events_1.OrderCancelled,
            OrderFilled: events_1.OrderFilled,
            CTFOrdersMatched: events_1.OrdersMatched,
            ProxyFactoryUpdated: events_1.ProxyFactoryUpdated,
            RemovedAdmin: events_1.RemovedAdmin,
            RemovedOperator: events_1.RemovedOperator,
            SafeFactoryUpdated: events_1.SafeFactoryUpdated,
            TokenRegistered: events_1.TokenRegistered,
            TradingPaused: events_1.TradingPaused,
            TradingUnpaused: events_1.TradingUnpaused,
        };
    }
}
exports.EventParser = EventParser;
exports.default = EventParser;
