import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { EventParser, ListenerOptions } from "../types";
import { createEventParser } from "../parser";
import { createLogger } from "../logger";
import { ABIs, BEACON_CONTRACT } from "../data";
export class Listener {
  private _prisma: PrismaClient;
  private _opensearch: any;
  private _seaport: any;
  private _options: ListenerOptions;
  private _contracts: ethers.Contract[];
  private _provider: ethers.providers.JsonRpcProvider;
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
    this._prisma = new PrismaClient();
  }

  async start() {
    this._parser = createEventParser();
    this._logger = createLogger(this._options.name);

    const contracts = await this._getContracts();
    contracts.push({
      address: "0xb04a755a13d22Eda328460EA67622e630b680320",
      type: "Beacon",
    });
    contracts.push({
      address: "0xD723f5B785b7922D60E4835fffd67f51aEC4f2cC",
      type: "Beacon",
    });
    contracts.push({
      address: "0xD49A798EA53e9Ad4A3D37879e44061D5aB11dF06",
      type: "Beacon",
    });
    contracts.push({
      address: "0xA3ce97aef057cbd00FDc1cA9BED8b6c5A457AA2B",
      type: "Beacon",
    });

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
    this._logger.info(`Listening to events for ${contract.address}`);
    contract.on("*", async (event) => {
      console.log(event);
      this._logger.info(
        `Event: ${event.event} for contract: ${contract.address}.`
      );
      try {
        if (this._parser[event.event]) {
          // getTransactionData utility function
          const transaction = null;
          const receipt = null;

          await this._parser[event.event](event, this, transaction, receipt, {
            prisma: this._prisma,
            logger: this._logger,
            options: this._options,
          });
        } else {
          this._logger.info(
            `Event: ${event.event} received, no matching parser.`
          );
        }
      } catch (e) {
        this._logger.error(e);
      }
    });
  }
  /*
  async addContract(address, type) {
    try {
      console.log(type);
      const contract = new ethers.Contract(address, ABIs[type], this._provider);
      this.createEventListener(contract);
      //await this._saveContract(address, type);
      this._contracts.push(contract);
    } catch (e) {
      console.error(e);
    }
  }
  /*
  async _saveContract(address, type) {
    this._logger.info(`Saving ${type} at address: ${address}`);
    try {
      await this._prisma.contract.create({
        data: {
          address,
          type,
        },
      });
    } catch (e) {
      this._logger.error(e);
    }
  }
*/
  async _getContracts() {
    let contracts = [];
    try {
      contracts = await this._prisma.collection.findMany({
        where: {
          chain: this._options.chain,
          is_dcentral: true,
        },
      });
      return contracts;
    } catch (e) {
      this._logger.error(e);
    }

    return contracts;
  }

  static get DEFAULTS(): ListenerOptions {
    return {
      name: "Event Listener",
      chain: 1,
      providerUrl: process.env.ETHEREUM_URL || "",
      opensearchUser: process.env.OPENSEARCH_USERNAME || "",
      opensearchPass: process.env.OPENSEARCH_PASSWORD || "",
      opensearchNode: process.env.OPENSEARCH_NODE || "",
    };
  }
}

export default Listener;
