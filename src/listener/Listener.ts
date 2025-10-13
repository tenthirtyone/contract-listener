import "dotenv/config";
import { ethers } from "ethers";
import {
  EventParser as TEventParser,
  ListenerOptions,
  LibraryContract,
} from "../types";
import { EventParsers, EventParserLookup } from "../parser";
import { createLogger } from "../logger";
import { ABIs } from "../data";
import { KafkaProducer } from "../kafka";

export interface MonitoredContract extends LibraryContract {}

export class Listener {
  private _options: ListenerOptions;
  private _contractInstances: ethers.Contract[] = [];
  private _provider: ethers.providers.JsonRpcProvider;
  private _eventParsers: EventParsers;
  private _logger: any;
  private _runtimeContracts: MonitoredContract[] = [];
  private _contractTypes: Map<string, string> = new Map();
  private _kafka?: KafkaProducer;

  constructor(options: ListenerOptions) {
    this._options = options;

    if (!this._options.providerUrl) {
      throw new Error("No providerUrl provided.");
    }

    if (!this._options.contracts) {
      throw new Error("No contracts provided.");
    }

    this._provider = new ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
  }

  async start() {
    this._eventParsers = new EventParsers();
    this._logger = createLogger(this._options.name);

    // Initialize Kafka if configured
    if (this._options.kafka) {
      this._kafka = new KafkaProducer(
        this._options.kafka.brokers,
        this._options.kafka.clientId || this._options.name
      );
      await this._kafka.connect();
    }

    await this.initializeContracts();
    this.setupEventListeners();
    this._logger.info("Event Listener started");
  }

  private async initializeContracts() {
    // Start with contracts provided in options
    let contracts = [...this._options.contracts];

    // Add any additional contracts that were registered at runtime
    contracts.push(...this._runtimeContracts);

    // Store contract types for lookup and register custom parsers
    contracts.forEach((contract) => {
      this._contractTypes.set(contract.address.toLowerCase(), contract.type);

      // Register custom parsers if provided
      if (contract.parsers) {
        this._eventParsers.addParsers(contract.type, contract.parsers);
      }
    });

    this._contractInstances = contracts.map((contract) => {
      // Use custom ABI if provided, otherwise fall back to built-in ABIs
      const abi = contract.abi || ABIs[contract.type];
      if (!abi) {
        this._logger.warn(`No ABI found for contract type: ${contract.type}`);
      }
      return new ethers.Contract(contract.address, abi || [], this._provider);
    });
  }

  async setupEventListeners() {
    this._contractInstances.forEach((contract) => {
      this.attachEventHandler(contract);
    });
  }

  attachEventHandler(contract: ethers.Contract) {
    const contractType = this.getContractType(contract.address);
    this._logger.info(
      `Listening to events for ${contractType} ${contract.address}`
    );
    contract.on("*", async (event) => {
      this._logger.debug(
        `Event: ${event.event} for contract: ${contract.address}`
      );

      try {
        // Get contract type for type-specific parsing
        const contractType = this.getContractType(contract.address);

        if (
          contractType &&
          this._eventParsers.parsers[contractType] &&
          this._eventParsers.parsers[contractType][event.event]
        ) {
          // Process synchronously - await each parser
          await this._eventParsers.parsers[contractType][event.event](
            event,
            this,
            {
              logger: this._logger,
              options: this._options,
              kafka: this._kafka,
            }
          );
        } else {
          this._logger.warn(
            `Event: "${
              event.event
            }" received for contract type "${contractType}", no matching parser. Available parsers for type: ${Object.keys(
              this._eventParsers.parsers[contractType] || {}
            ).join(", ")}`
          );
        }
      } catch (error) {
        this._logger.error(
          {
            event: event.event,
            contract: contract.address,
            error:
              error instanceof Error
                ? { message: error.message, stack: error.stack }
                : error,
          },
          `Error processing event ${event.event}`
        );
      }
    });
  }
  // Add a contract to listen to dynamically
  async addContract(address: string, type: string, abi?: any): Promise<void> {
    try {
      this._logger.info(`Adding contract ${address} of type ${type}`);

      const contractAbi = abi || ABIs[type] || [];
      const contract = new ethers.Contract(
        address,
        contractAbi,
        this._provider
      );
      this.attachEventHandler(contract);
      this._contractInstances.push(contract);
      this._runtimeContracts.push({ address, type, abi });
      this._contractTypes.set(address.toLowerCase(), type);

      this._logger.info(`Contract ${address} added successfully`);
    } catch (error) {
      this._logger.error(`Failed to add contract ${address}:`, error);
      throw error;
    }
  }

  // Get all currently listening contracts
  getContracts(): ethers.Contract[] {
    return [...this._contractInstances];
  }

  // Get the provider instance
  getProvider(): ethers.providers.JsonRpcProvider {
    return this._provider;
  }

  // Get current options
  getOptions(): ListenerOptions {
    return { ...this._options };
  }

  // Get the event parsers instance to add custom parsers
  getParsers(): EventParsers {
    return this._eventParsers;
  }

  // Get contract type by address
  private getContractType(address: string): string | undefined {
    return this._contractTypes.get(address.toLowerCase());
  }

  // Stop the listener and clean up
  async stop(): Promise<void> {
    this._logger.info("Stopping event listener");

    // Remove all event listeners
    this._contractInstances.forEach((contract) => {
      contract.removeAllListeners();
    });

    // Disconnect Kafka
    if (this._kafka) {
      await this._kafka.disconnect();
    }

    // Clear contracts array
    this._contractInstances = [];

    this._logger.info("Event listener stopped");
  }
}

export default Listener;
