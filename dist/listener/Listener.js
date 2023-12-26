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
exports.Listener = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const opensearch_1 = require("@opensearch-project/opensearch");
const ethers_1 = require("ethers");
const parser_1 = require("../parser");
const logger_1 = require("../logger");
const seaport_js_1 = require("@opensea/seaport-js");
const data_1 = require("../data");
class Listener {
    constructor(options) {
        this._options = Object.assign(Object.assign({}, Listener.DEFAULTS), options);
        if (!this._options.providerUrl) {
            throw new Error("No providerUrl provided.");
        }
        this._provider = new ethers_1.ethers.providers.JsonRpcProvider(this._options.providerUrl);
        this._prisma = new client_1.PrismaClient();
        this._seaport = new seaport_js_1.Seaport(this._provider);
        this._opensearch = new opensearch_1.Client({
            node: this._options.opensearchNode,
            auth: {
                username: this._options.opensearchUser,
                password: this._options.opensearchPass,
            },
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._parser = (0, parser_1.createEventParser)();
            this._logger = (0, logger_1.createLogger)("Event Listener");
            const contracts = []; //await this._getContracts();
            contracts.push({
                address: "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",
                type: "seaport15",
            });
            this._contracts = contracts.map((contract) => {
                return new ethers_1.ethers.Contract(contract.address, data_1.ABIs[contract.type], this._provider);
            });
            this.listenForEvents();
            this._logger.info("Event Listener started");
        });
    }
    listenForEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            this._contracts.forEach((contract) => {
                this.createEventListener(contract);
            });
        });
    }
    createEventListener(contract) {
        this._logger.info(`Listening to events for ${contract.address}`);
        contract.on("*", (event) => __awaiter(this, void 0, void 0, function* () {
            this._logger.info(`Event: ${event.event} for contract: ${contract.address}.`);
            try {
                if (this._parser[event.event]) {
                    const transaction = null;
                    const receipt = null;
                    yield this._parser[event.event](event, this, transaction, receipt, {
                        prisma: this._prisma,
                        opensearch: this._opensearch,
                        seaport: this._seaport,
                    });
                }
                else {
                    this._logger.info(`Event: ${event.event} received, no matching parser.`);
                }
            }
            catch (e) {
                this._logger.error(e);
            }
        }));
    }
    addContract(address, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = new ethers_1.ethers.Contract(address, data_1.ABIs[type], this._provider);
                this.createEventListener(contract);
                //await this._saveContract(address, type);
                this._contracts.push(contract);
            }
            catch (e) {
                console.error(e);
            }
        });
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
  
    async _getContracts() {
      let contracts = [];
      try {
        contracts = await this._db.contract.findMany();
      } catch (e) {
        this._logger.error(e);
      }
  
      return contracts;
    }
  */
    static get DEFAULTS() {
        return {
            providerUrl: process.env.PROVIDER_URL || "",
            opensearchUser: process.env.OPENSEARCH_USERNAME || "",
            opensearchPass: process.env.OPENSEARCH_PASSWORD || "",
            opensearchNode: process.env.OPENSEARCH_NODE || "",
        };
    }
}
exports.Listener = Listener;
exports.default = Listener;
