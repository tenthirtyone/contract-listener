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
const ethers_1 = require("ethers");
const parser_1 = require("../parser");
const logger_1 = require("../logger");
const data_1 = require("../data");
class Listener {
    constructor(options) {
        this._contractInstances = [];
        this._runtimeContracts = [];
        this._contractTypes = new Map();
        this._options = options;
        if (!this._options.providerUrl) {
            throw new Error("No providerUrl provided.");
        }
        if (!this._options.contracts) {
            throw new Error("No contracts provided.");
        }
        this._provider = new ethers_1.ethers.providers.JsonRpcProvider(this._options.providerUrl);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventParsers = new parser_1.EventParsers();
            this._logger = (0, logger_1.createLogger)(this._options.name);
            yield this.initializeContracts();
            this.setupEventListeners();
            this._logger.info("Event Listener started");
        });
    }
    initializeContracts() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const abi = contract.abi || data_1.ABIs[contract.type];
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
                // Get transaction and receipt data
                const transaction = yield this._provider.getTransaction(event.transactionHash);
                const receipt = yield this._provider.getTransactionReceipt(event.transactionHash);
                // Get contract type for type-specific parsing
                const contractType = this.getContractType(contract.address);
                if (contractType &&
                    this._eventParsers.parsers[contractType] &&
                    this._eventParsers.parsers[contractType][event.event]) {
                    yield this._eventParsers.parsers[contractType][event.event](event, this, transaction, receipt, {
                        logger: this._logger,
                        options: this._options,
                    });
                }
            }
            catch (error) {
                this._logger.error(`Error processing event ${event.event}:`, error);
            }
        }));
    }
    // Add a contract to listen to dynamically
    addContract(address, type, abi) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._logger.info(`Adding contract ${address} of type ${type}`);
                const contractAbi = abi || data_1.ABIs[type] || [];
                const contract = new ethers_1.ethers.Contract(address, contractAbi, this._provider);
                this.attachEventHandler(contract);
                this._contractInstances.push(contract);
                this._runtimeContracts.push({ address, type, abi });
                this._contractTypes.set(address.toLowerCase(), type);
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
    // Get current options
    getOptions() {
        return Object.assign({}, this._options);
    }
    // Get the event parsers instance to add custom parsers
    getParsers() {
        return this._eventParsers;
    }
    // Get contract type by address
    getContractType(address) {
        return this._contractTypes.get(address.toLowerCase());
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
            this._logger.info("Event listener stopped");
        });
    }
}
exports.Listener = Listener;
exports.default = Listener;
