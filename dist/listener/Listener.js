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
const ethers_1 = require("ethers");
const parser_1 = require("../parser");
const logger_1 = require("../logger");
const data_1 = require("../data");
class Listener {
    constructor(options) {
        this._options = Object.assign(Object.assign({}, Listener.DEFAULTS), options);
        if (!this._options.providerUrl) {
            throw new Error("No providerUrl provided.");
        }
        this._provider = new ethers_1.ethers.providers.JsonRpcProvider(this._options.providerUrl);
        this._prisma = new client_1.PrismaClient();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._parser = (0, parser_1.createEventParser)();
            this._logger = (0, logger_1.createLogger)(this._options.name);
            const contracts = yield this._getContracts();
            contracts.push({
                address: "0x9FBf72cF4825642ce904F00d3B52D643aC202045",
                type: "Beacon",
            });
            /*
            contracts.push({
              address: "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",
              type: "seaport15",
            });
            */
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
                        logger: this._logger,
                        options: this._options,
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
  */
    _getContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            let contracts = [];
            try {
                contracts = yield this._prisma.collection.findMany({
                    where: {
                        chain: this._options.chain,
                    },
                });
                return contracts;
            }
            catch (e) {
                this._logger.error(e);
            }
            return contracts;
        });
    }
    static get DEFAULTS() {
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
exports.Listener = Listener;
exports.default = Listener;
