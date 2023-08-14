"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = exports.createEventParser = void 0;
const events_1 = require("./events");
function createEventParser() {
    return {
        ProxyDeployed: events_1.ProxyDeployed,
        TokenMint: events_1.TokenMint,
        TransferSingle: events_1.TransferSingle,
    };
}
exports.createEventParser = createEventParser;
class EventParser {
    static create() {
        return {
            ProxyDeployed: events_1.ProxyDeployed,
            TokenMint: events_1.TokenMint,
            TransferSingle: events_1.TransferSingle,
        };
    }
}
exports.EventParser = EventParser;
exports.default = EventParser;
