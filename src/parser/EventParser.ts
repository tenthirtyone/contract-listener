import { EventParser as TEventParser, Event, ParsedEvent } from "../types";
import CTFExchangeParsers from "./events/CTFExchange";

export type EventParserFunction = (
  evt: ParsedEvent,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
) => Promise<void>;

// Transform raw ethers event to ParsedEvent
function transformEvent(rawEvent: any): ParsedEvent {
  return {
    blockNumber: rawEvent.blockNumber,
    blockHash: rawEvent.blockHash,
    address: rawEvent.address,
    transactionHash: rawEvent.transactionHash,
    event: rawEvent.event,
    data: rawEvent.args, // Map args to parameters for backward compatibility
    parameters: rawEvent.args, // Keep both for flexibility
    transaction: rawEvent.transaction,
    receipt: rawEvent.receipt,
  };
}

export function createEventParser(): TEventParser {
  const parsers: any = {};

  // Directly map each parser from CTFExchange
  CTFExchangeParsers.parsers.forEach((parserFunction: any) => {
    if (typeof parserFunction === "function") {
      // Use the function name directly as the event name
      const eventName = parserFunction.name;
      parsers[eventName] = async (
        rawEvent: Event,
        eventListener: any,
        transaction: any,
        receipt: any,
        context: any
      ) => {
        const parsedEvent = transformEvent(rawEvent);
        await parserFunction(
          parsedEvent,
          eventListener,
          transaction,
          receipt,
          context
        );
      };
    }
  });

  return parsers as TEventParser;
}

export class EventParser {
  static create() {
    return createEventParser();
  }
}

export default EventParser;
