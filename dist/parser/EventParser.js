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
exports.EventParser = exports.createEventParser = void 0;
// Transform raw ethers event to ParsedEvent
function transformEvent(rawEvent) {
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
// Dynamic parser registration
function registerParsers() {
    const parsers = new Map();
    try {
        // Dynamically import all contract parsers
        const eventsModule = require("./events");
        if (eventsModule.default && eventsModule.default.parsers) {
            eventsModule.default.parsers.forEach((contractParsers) => {
                if (contractParsers && contractParsers.parsers) {
                    contractParsers.parsers.forEach((parserFunction) => {
                        if (typeof parserFunction === "function") {
                            const eventName = parserFunction.name;
                            parsers.set(eventName, parserFunction);
                        }
                    });
                }
            });
        }
    }
    catch (error) {
        console.error("Failed to register parsers:", error);
    }
    return parsers;
}
const registeredParsers = registerParsers();
function createEventParser() {
    const parsers = {};
    registeredParsers.forEach((parserFunction, eventName) => {
        parsers[eventName] = (rawEvent, eventListener, transaction, receipt, context) => __awaiter(this, void 0, void 0, function* () {
            const parsedEvent = transformEvent(rawEvent);
            yield parserFunction(parsedEvent, eventListener, transaction, receipt, context);
        });
    });
    return parsers;
}
exports.createEventParser = createEventParser;
class EventParser {
    static create() {
        return createEventParser();
    }
    // Allow manual registration if needed
    static registerParser(eventName, parser) {
        registeredParsers.set(eventName, parser);
    }
}
exports.EventParser = EventParser;
exports.default = EventParser;
