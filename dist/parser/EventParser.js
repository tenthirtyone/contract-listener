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
        };
    }
}
exports.EventParser = EventParser;
exports.default = EventParser;
