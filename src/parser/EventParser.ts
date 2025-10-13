import { EventParser as TEventParser, Event, ParsedEvent } from "../types";

export type EventParserFunction = (
  evt: ParsedEvent,
  eventListener: any,
  transaction: any,
  receipt: any,
  context: any
) => Promise<void>;

export type EventParserLookup = {
  [contractType: string]: {
    [eventName: string]: (
      rawEvent: Event,
      eventListener: any,
      transaction: any,
      receipt: any,
      context: any
    ) => Promise<void>;
  };
};

export class EventParsers {
  public parsers: EventParserLookup;

  constructor() {
    this.parsers = this.createParsers();
  }

  private createParsers(): EventParserLookup {
    const result: EventParserLookup = {};

    try {
      const eventsModule = require("./events");

      if (eventsModule.default && eventsModule.default.parsers) {
        eventsModule.default.parsers.forEach((contractParsers: any) => {
          if (
            contractParsers &&
            (contractParsers.name || contractParsers.type) &&
            contractParsers.parsers
          ) {
            const typeName = contractParsers.name || contractParsers.type;
            result[typeName] = {};

            contractParsers.parsers.forEach((parserFunction: any) => {
              if (typeof parserFunction === "function") {
                const eventName = parserFunction.name;
                result[typeName][eventName] = async (
                  rawEvent: Event,
                  eventListener: any,
                  transaction: any,
                  receipt: any,
                  context: any
                ) => {
                  const parsedEvent = this.transformEvent(rawEvent);
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
          }
        });
      }
    } catch (error) {
      console.error("Failed to register parsers:", error);
    }

    return result;
  }

  private transformEvent(rawEvent: any): ParsedEvent {
    return {
      blockNumber: rawEvent.blockNumber,
      blockHash: rawEvent.blockHash,
      address: rawEvent.address,
      transactionHash: rawEvent.transactionHash,
      transactionIndex: rawEvent.transactionIndex,
      logIndex: rawEvent.logIndex,
      event: rawEvent.event,
      data: rawEvent.args,
      parameters: rawEvent.args,
      transaction: rawEvent.transaction,
      receipt: rawEvent.receipt,
    };
  }

  // Add a parser for a contract type and event name
  addParser(
    contractType: string,
    eventName: string,
    parser: EventParserFunction
  ): void {
    if (!this.parsers[contractType]) {
      this.parsers[contractType] = {};
    }

    // Wrap the parser function with event transformation
    this.parsers[contractType][eventName] = async (
      rawEvent: Event,
      eventListener: any,
      transaction: any,
      receipt: any,
      context: any
    ) => {
      const parsedEvent = this.transformEvent(rawEvent);
      await parser(parsedEvent, eventListener, transaction, receipt, context);
    };
  }

  // Add multiple parsers for a contract type
  addParsers(
    contractType: string,
    parsers: Record<string, EventParserFunction>
  ): void {
    Object.entries(parsers).forEach(([eventName, parser]) => {
      this.addParser(contractType, eventName, parser);
    });
  }
}
