"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const ethers_1 = require("ethers");
const data_1 = require("@/data");
const http_1 = require("@/http");
const parser_1 = require("@/parser");
const poller_1 = require("@/poller");
const logger_1 = require("@/logger");
const data_2 = require("../data");
class Listener {
  constructor(options) {
    this._options = Object.assign(
      Object.assign({}, Listener.DEFAULTS),
      options
    );
    if (!this._options.providerUrl) {
      throw new Error("No providerUrl provided.");
    }
    this._provider = new ethers_1.ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
    this._db = new client_1.PrismaClient();
  }
  start() {
    return __awaiter(this, void 0, void 0, function* () {
      this._poller = (0, poller_1.createPoller)();
      this._parser = (0, parser_1.createEventParser)();
      this._logger = (0, logger_1.createLogger)("Event Listener");
      this._webhooks = data_1.mockWebhooks;
      const contracts = yield this._getContracts();
      this._contracts = contracts.map((contract) => {
        return new ethers_1.ethers.Contract(
          contract.address,
          data_2.ABIs[contract.type],
          this._provider
        );
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
    contract.on("*", (event) =>
      __awaiter(this, void 0, void 0, function* () {
        this._logger.info(
          `Event: ${event.event} for contract: ${contract.address}.`
        );
        try {
          if (this._parser[event.event]) {
            const data = yield this._parser[event.event](event, this);
            this._webhooks.forEach((hook) => (0, http_1.post)(hook.url, data));
          }
        } catch (e) {
          this._logger.error(e);
        }
      })
    );
  }
  addContract(address, type) {
    return __awaiter(this, void 0, void 0, function* () {
      const contract = new ethers_1.ethers.Contract(
        address,
        data_2.ABIs[type],
        this._provider
      );
      try {
        yield this._saveContract(address, type);
        this.createEventListener(contract);
        this._contracts.push(contract);
      } catch (e) {
        console.error(e);
      }
    });
  }
  _saveContract(address, type) {
    return __awaiter(this, void 0, void 0, function* () {
      this._logger.info(`Saving ${type} at address: ${address}`);
      try {
        yield this._db.contract.create({
          data: {
            address,
            type,
          },
        });
      } catch (e) {
        this._logger.error(e);
      }
    });
  }
  _getContracts() {
    return __awaiter(this, void 0, void 0, function* () {
      let contracts = [];
      try {
        contracts = yield this._db.contract.findMany();
      } catch (e) {
        this._logger.error(e);
      }
      return contracts;
    });
  }
  get price() {
    return this._poller.getRecentPrice();
  }
  static get DEFAULTS() {
    return {
      providerUrl: process.env.PROVIDER_URL || "",
    };
  }
}
exports.Listener = Listener;
exports.default = Listener;
