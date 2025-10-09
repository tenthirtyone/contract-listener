"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParsers = void 0;
class EventParsers {
    constructor() {
        this.parsers = this.createParsers();
    }
    createParsers() {
        const result = {};
        try {
            const eventsModule = require("./events");
            if (eventsModule.default && eventsModule.default.parsers) {
                eventsModule.default.parsers.forEach((contractParsers) => {
                    if (contractParsers &&
                        (contractParsers.name || contractParsers.type) &&
                        contractParsers.parsers) {
                        const typeName = contractParsers.name || contractParsers.type;
                        result[typeName] = {};
                        contractParsers.parsers.forEach((parserFunction) => {
                            if (typeof parserFunction === "function") {
                                const eventName = parserFunction.name;
                                result[typeName][eventName] = (rawEvent, eventListener, transaction, receipt, context) => __awaiter(this, void 0, void 0, function* () {
                                    const parsedEvent = this.transformEvent(rawEvent);
                                    yield parserFunction(parsedEvent, eventListener, transaction, receipt, context);
                                });
                            }
                        });
                    }
                });
            }
        }
        catch (error) {
            console.error("Failed to register parsers:", error);
        }
        return result;
    }
    transformEvent(rawEvent) {
        return {
            blockNumber: rawEvent.blockNumber,
            blockHash: rawEvent.blockHash,
            address: rawEvent.address,
            transactionHash: rawEvent.transactionHash,
            event: rawEvent.event,
            data: rawEvent.args,
            parameters: rawEvent.args,
            transaction: rawEvent.transaction,
            receipt: rawEvent.receipt,
        };
    }
    // Add a parser for a contract type and event name
    addParser(contractType, eventName, parser) {
        if (!this.parsers[contractType]) {
            this.parsers[contractType] = {};
        }
        // Wrap the parser function with event transformation
        this.parsers[contractType][eventName] = (rawEvent, eventListener, transaction, receipt, context) => __awaiter(this, void 0, void 0, function* () {
            const parsedEvent = this.transformEvent(rawEvent);
            yield parser(parsedEvent, eventListener, transaction, receipt, context);
        });
    }
    // Add multiple parsers for a contract type
    addParsers(contractType, parsers) {
        Object.entries(parsers).forEach(([eventName, parser]) => {
            this.addParser(contractType, eventName, parser);
        });
    }
}
exports.EventParsers = EventParsers;
