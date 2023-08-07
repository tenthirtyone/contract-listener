import "dotenv/config";
import { ethers } from "ethers";
import { mockContracts, mockWebhooks } from "@/data";
import {
  EventParser,
  ListenerOptions,
  Webhook,
  EthereumAddress,
} from "@/types";
import { post } from "@/http";
import { createEventParser } from "@/parser";
import { createLogger } from "@/logger";
import { EventDatabase } from "@/db";

export class Listener {
  private _db: EventDatabase;
  private _options: ListenerOptions;
  private _webhooks: Webhook[];
  private _contracts: ethers.Contract[];
  private _provider: ethers.providers.JsonRpcProvider;
  private _parser: EventParser;
  private _listeners: any[];
  private _logger;

  constructor(options?: Partial<ListenerOptions>) {
    this._options = { ...Listener.DEFAULTS, ...options };
    if (!this._options.providerUrl) {
      throw new Error("No providerUrl provided.");
    }
    this._provider = new ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
    this._db = new EventDatabase();

    this._webhooks = mockWebhooks;
    this._contracts = mockContracts.map((contract) => {
      return new ethers.Contract(
        contract.address,
        contract.abi,
        this._provider
      );
    });
    this._parser = createEventParser();
    this._logger = createLogger("Event Listener");
    this.listenForEvents();
    this._logger.info("Event Listener started");
  }

  async listenForEvents() {
    this._contracts.forEach((contract) => {
      this.createEventListener(contract);
    });
  }

  createEventListener(contract) {
    contract.on("*", (event) => {
      this._logger.info(
        `Event: ${event.event} for contract: ${contract.address}.`
      );
      try {
        if (this._parser[event.event]) {
          const data = this._parser[event.event](event, this);
          // save data to database
          this._webhooks.forEach((hook) => post(hook.url, data));
        }
      } catch (e) {
        this._logger.error(e);
      }
    });
  }

  addContract(address, abi) {
    const contract = new ethers.Contract(
      address,
      abi,
      this._provider
    );
    this.createEventListener(contract);
    this._contracts.push(contract);
  }

  static get DEFAULTS(): ListenerOptions {
    return {
      providerUrl: process.env.PROVIDER_URL || "",
    };
  }
}

export default Listener;
