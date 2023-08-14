"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPoller = exports.PricePoller = void 0;
const axios_1 = __importDefault(require("axios"));
class PricePoller {
    constructor(pollingInterval = 5000) {
        this.pollingInterval = pollingInterval;
        this._interval = null;
        this._price = null;
        this.getEthereumPrice();
        this.start();
    }
    start() {
        this._interval = setInterval(() => {
            this.getEthereumPrice();
        }, this.pollingInterval);
    }
    stop() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }
    getEthereumPrice() {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
        axios_1.default.get(url)
            .then(response => {
            this._price = response.data.ethereum.usd;
            //console.debug(`Ethereum price in USD: ${this._price}`);
        })
            .catch(error => {
            console.error(`An error occurred: ${error}`);
        });
    }
    getRecentPrice() {
        return this._price;
    }
}
exports.PricePoller = PricePoller;
function createPoller(interval = 5000) {
    return new PricePoller(interval);
}
exports.createPoller = createPoller;
