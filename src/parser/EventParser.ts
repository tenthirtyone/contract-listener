import { EventParser as TEventParser, Event, ParsedEvent } from "../types";

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

// Dynamic parser registration
function registerParsers(): Map<string, EventParserFunction> {
  const parsers = new Map<string, EventParserFunction>();

  try {
    // Dynamically import all contract parsers
    const eventsModule = require("./events");

    if (eventsModule.default && eventsModule.default.parsers) {
      eventsModule.default.parsers.forEach((contractParsers: any) => {
        if (contractParsers && contractParsers.parsers) {
          contractParsers.parsers.forEach((parserFunction: any) => {
            if (typeof parserFunction === "function") {
              const eventName = parserFunction.name;
              parsers.set(eventName, parserFunction);
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed to register parsers:", error);
  }

  return parsers;
}

const registeredParsers = registerParsers();

export function createEventParser(): TEventParser {
  const parsers: any = {};

  registeredParsers.forEach((parserFunction, eventName) => {
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
  });

  return parsers as TEventParser;
}

export class EventParser {
  static create() {
    return createEventParser();
  }

  // Allow manual registration if needed
  static registerParser(eventName: string, parser: EventParserFunction): void {
    registeredParsers.set(eventName, parser);
  }
}

export default EventParser;
