import "dotenv/config";
import { PrismaClient } from '@prisma/client';
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
import { createPoller } from "@/poller";
import { createLogger } from "@/logger";
import { ABIs, BEACON_CONTRACT } from "../data"
export class Listener {
  private _db: PrismaClient;
  private _options: ListenerOptions;
  private _webhooks: Webhook[];
  private _contracts: ethers.Contract[];
  private _provider: ethers.providers.JsonRpcProvider;
  private _poller;
  private _parser: EventParser;
  private _logger;

  constructor(options?: Partial<ListenerOptions>) {
    this._options = { ...Listener.DEFAULTS, ...options };
    if (!this._options.providerUrl) {
      throw new Error("No providerUrl provided.");
    }
    this._provider = new ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
    this._db = new PrismaClient();


  }

  async start() {
    this._poller = createPoller();
    this._parser = createEventParser();
    this._logger = createLogger("Event Listener");

    this._webhooks = mockWebhooks;


    const contracts = await this._getContracts();

    this._contracts = contracts.map((contract) => {
      return new ethers.Contract(
        contract.address,
        ABIs[contract.type],
        this._provider
      );
    });
    this.listenForEvents();
    this._logger.info("Event Listener started");
  }

  async listenForEvents() {
    this._contracts.forEach((contract) => {
      this.createEventListener(contract);
    });
  }

  createEventListener(contract) {
    this._logger.info(`Listening to events for ${contract.address}`)
    contract.on("*", async (event) => {
      this._logger.info(
        `Event: ${event.event} for contract: ${contract.address}.`
      );
      try {
        if (this._parser[event.event]) {
          const data = await this._parser[event.event](event, this);
          this._webhooks.forEach((hook) => post(hook.url, data));
        }
      } catch (e) {
        this._logger.error(e);
      }
    });
  }

  async addContract(address, type) {
    const contract = new ethers.Contract(
      address,
      ABIs[type],
      this._provider
    );
    try {
      await this._saveContract(address, type);
      this.createEventListener(contract);
      this._contracts.push(contract);
    } catch (e) {
      console.error(e);
    }
  }

  async _saveContract(address, type) {
    this._logger.info(`Saving ${type} at address: ${address}`);
    try {

      await this._db.contract.create({
        data: {
          address,
          type
        },
      });
    } catch (e) {
      this._logger.error(e);
    }
  }

  async _getContracts() {
    let contracts = [];
    try {
      contracts = await this._db.contract.findMany();
    } catch (e) {
      this._logger.error(e);
    }

    return contracts;
  }

  get price() {
    return this._poller.getRecentPrice();
  }

  static get DEFAULTS(): ListenerOptions {
    return {
      providerUrl: process.env.PROVIDER_URL || "",
    };
  }
}

export default Listener;
