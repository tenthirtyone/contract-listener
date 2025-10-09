"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedEvent = void 0;
class ParsedEvent {
    constructor(blockNumber, blockHash, transactionHash, address, event, data, transaction, receipt) {
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        this.transactionHash = transactionHash;
        this.address = address;
        this.event = event;
        this.data = data;
        this.transaction = transaction;
        this.receipt = receipt;
        this.timestamp = Date.now();
    }
}
exports.ParsedEvent = ParsedEvent;
