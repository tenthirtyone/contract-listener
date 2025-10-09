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
        this._contractInstances = [];
        this._runtimeContracts = [];
        this._options = Object.assign(Object.assign({}, Listener.DEFAULTS), options);
        if (!this._options.providerUrl) {
            throw new Error("No providerUrl provided.");
        }
        this._provider = new ethers_1.ethers.providers.JsonRpcProvider(this._options.providerUrl);
        this._prisma = new client_1.PrismaClient();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventParsers = (0, parser_1.createEventParser)();
            this._logger = (0, logger_1.createLogger)(this._options.name);
            yield this.initializeContracts();
            this.setupEventListeners();
            this._logger.info("Event Listener started");
        });
    }
    initializeContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = yield this.loadDatabaseContracts();
            // Add any additional contracts that were registered
            contracts.push(...this._runtimeContracts);
            this._contractInstances = contracts.map((contract) => {
                const abi = data_1.ABIs[contract.type];
                if (!abi) {
                    this._logger.warn(`No ABI found for contract type: ${contract.type}`);
                }
                return new ethers_1.ethers.Contract(contract.address, abi || [], this._provider);
            });
        });
    }
    setupEventListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            this._contractInstances.forEach((contract) => {
                this.attachEventHandler(contract);
            });
        });
    }
    attachEventHandler(contract) {
        this._logger.info(`Listening to events for ${contract.address}`);
        contract.on("*", (event) => __awaiter(this, void 0, void 0, function* () {
            this._logger.info(`Event: ${event.event} for contract: ${contract.address}`);
            try {
                if (this._eventParsers[event.event]) {
                    // Get transaction and receipt data
                    const transaction = yield this._provider.getTransaction(event.transactionHash);
                    const receipt = yield this._provider.getTransactionReceipt(event.transactionHash);
                    yield this._eventParsers[event.event](event, this, transaction, receipt, {
                        prisma: this._prisma,
                        logger: this._logger,
                        options: this._options,
                    });
                }
                else {
                    console.log(`Event: "${event.event}" received, no matching parser. Available parsers: ${Object.keys(this._eventParsers).join(', ')}`);
                    this._logger.debug(`Event: ${event.event} received, no matching parser`);
                }
            }
            catch (error) {
                this._logger.error(`Error processing event ${event.event}:`, error);
            }
        }));
    }
    // Add a contract to listen to dynamically
    addContract(address, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._logger.info(`Adding contract ${address} of type ${type}`);
                const contract = new ethers_1.ethers.Contract(address, data_1.ABIs[type] || [], this._provider);
                this.attachEventHandler(contract);
                this._contractInstances.push(contract);
                this._runtimeContracts.push({ address, type });
                this._logger.info(`Contract ${address} added successfully`);
            }
            catch (error) {
                this._logger.error(`Failed to add contract ${address}:`, error);
                throw error;
            }
        });
    }
    // Get all currently listening contracts
    getContracts() {
        return [...this._contractInstances];
    }
    // Get the provider instance
    getProvider() {
        return this._provider;
    }
    // Get the prisma client
    getPrisma() {
        return this._prisma;
    }
    // Get current options
    getOptions() {
        return Object.assign({}, this._options);
    }
    // Stop the listener and clean up
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger.info("Stopping event listener");
            // Remove all event listeners
            this._contractInstances.forEach((contract) => {
                contract.removeAllListeners();
            });
            // Clear contracts array
            this._contractInstances = [];
            // Close Prisma connection
            yield this._prisma.$disconnect();
            this._logger.info("Event listener stopped");
        });
    }
    loadDatabaseContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            let contracts = [];
            try {
                const collections = yield this._prisma.collection.findMany({
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
            }
            catch (error) {
                this._logger.error("Failed to fetch contracts from database:", error);
                return [];
            }
        });
    }
    static get DEFAULTS() {
        return {
            name: "Event Listener",
            chain: 1,
            providerUrl: process.env.ETHEREUM_URL || "",
        };
    }
}
exports.Listener = Listener;
exports.default = Listener;
