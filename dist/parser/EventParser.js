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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = exports.createEventParser = void 0;
const CTFExchange_1 = __importDefault(require("./events/CTFExchange"));
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
function createEventParser() {
    const parsers = {};
    // Directly map each parser from CTFExchange
    CTFExchange_1.default.parsers.forEach((parserFunction) => {
        if (typeof parserFunction === "function") {
            // Use the function name directly as the event name
            const eventName = parserFunction.name;
            parsers[eventName] = (rawEvent, eventListener, transaction, receipt, context) => __awaiter(this, void 0, void 0, function* () {
                const parsedEvent = transformEvent(rawEvent);
                yield parserFunction(parsedEvent, eventListener, transaction, receipt, context);
            });
        }
    });
    return parsers;
}
exports.createEventParser = createEventParser;
class EventParser {
    static create() {
        return createEventParser();
    }
}
exports.EventParser = EventParser;
exports.default = EventParser;
