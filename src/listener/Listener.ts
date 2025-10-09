import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { EventParser, ListenerOptions } from "../types";
import { createEventParser } from "../parser";
import { createLogger } from "../logger";
import { ABIs } from "../data";

export interface MonitoredContract {
  address: string;
  type: string;
}

export class Listener {
  private _prisma: PrismaClient;
  private _options: ListenerOptions;
  private _contractInstances: ethers.Contract[] = [];
  private _provider: ethers.providers.JsonRpcProvider;
  private _eventParsers: EventParser;
  private _logger: any;
  private _runtimeContracts: MonitoredContract[] = [];

  constructor(options?: Partial<ListenerOptions>) {
    this._options = { ...Listener.DEFAULTS, ...options };

    if (!this._options.providerUrl) {
      throw new Error("No providerUrl provided.");
    }

    this._provider = new ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
    this._prisma = new PrismaClient();
  }

  async start() {
    this._eventParsers = createEventParser();
    this._logger = createLogger(this._options.name);

    await this.initializeContracts();
    this.setupEventListeners();
    this._logger.info("Event Listener started");
  }

  private async initializeContracts() {
    const contracts = await this.loadDatabaseContracts();

    // Add any additional contracts that were registered
    contracts.push(...this._runtimeContracts);

    this._contractInstances = contracts.map((contract) => {
      const abi = ABIs[contract.type];
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
    this._logger.info(`Listening to events for ${contract.address}`);
    contract.on("*", async (event) => {
      this._logger.info(
        `Event: ${event.event} for contract: ${contract.address}`
      );

      try {
        if (this._eventParsers[event.event]) {
          // Get transaction and receipt data
          const transaction = await this._provider.getTransaction(
            event.transactionHash
          );
          const receipt = await this._provider.getTransactionReceipt(
            event.transactionHash
          );

          await this._eventParsers[event.event](
            event,
            this,
            transaction,
            receipt,
            {
              prisma: this._prisma,
              logger: this._logger,
              options: this._options,
            }
          );
        } else {
          console.log(
            `Event: "${
              event.event
            }" received, no matching parser. Available parsers: ${Object.keys(
              this._eventParsers
            ).join(", ")}`
          );
          this._logger.debug(
            `Event: ${event.event} received, no matching parser`
          );
        }
      } catch (error) {
        this._logger.error(`Error processing event ${event.event}:`, error);
      }
    });
  }
  // Add a contract to listen to dynamically
  async addContract(address: string, type: string): Promise<void> {
    try {
      this._logger.info(`Adding contract ${address} of type ${type}`);

      const contract = new ethers.Contract(
        address,
        ABIs[type] || [],
        this._provider
      );
      this.attachEventHandler(contract);
      this._contractInstances.push(contract);
      this._runtimeContracts.push({ address, type });

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

  // Get the prisma client
  getPrisma(): PrismaClient {
    return this._prisma;
  }

  // Get current options
  getOptions(): ListenerOptions {
    return { ...this._options };
  }

  // Stop the listener and clean up
  async stop(): Promise<void> {
    this._logger.info("Stopping event listener");

    // Remove all event listeners
    this._contractInstances.forEach((contract) => {
      contract.removeAllListeners();
    });

    // Clear contracts array
    this._contractInstances = [];

    // Close Prisma connection
    await this._prisma.$disconnect();

    this._logger.info("Event listener stopped");
  }

  private async loadDatabaseContracts(): Promise<MonitoredContract[]> {
    let contracts: MonitoredContract[] = [];
    try {
      const collections = await this._prisma.collection.findMany({
        where: {
          chain: this._options.chain,
          is_dcentral: true,
        },
      });

      // Map database collections to MonitoredContract format
      contracts = collections.map((collection) => ({
        address: collection.address,
        type: collection.type || "ERC721", // Default type if not specified
      }));

      return contracts;
    } catch (error) {
      this._logger.error("Failed to fetch contracts from database:", error);
      return [];
    }
  }

  static get DEFAULTS(): ListenerOptions {
    return {
      name: "Event Listener",
      chain: 1,
      providerUrl: process.env.ETHEREUM_URL || "",
    };
  }
}

export default Listener;
