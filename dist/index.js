"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listener_1 = require("./listener");
__exportStar(require("./types"), exports);
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const LISTENER_CONFIGS = [
    {
        providerUrl: process.env.ETHEREUM_URL ||
            `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        name: "PolymarketListener",
        chain: 137,
        contracts: [
            {
                address: "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
                type: "ConditionalTokenFramework",
            },
            {
                address: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
                type: "CTFExchange",
            },
            {
                address: "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296",
                type: "NegRiskAdapter",
            },
            {
                address: "0x2F5e3684cb1F318ec51b00Edba38d79Ac2c0aA9d",
                type: "UMACTFAdapterV3",
            },
            {
                address: "0x6A9D222616C90FcA5754cd1333cFD9b7fb6a4F74",
                type: "UMACTFAdapterV2",
            },
            {
                address: "0xCB1822859cEF82Cd2Eb4E6276C7916e692995130",
                type: "UMACTFAdapterV1",
            },
            {
                address: "0xaacfeea03eb1561c4e67d661e40682bd20e3541b",
                type: "GnosisSafeFactory",
            },
        ],
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting listeners...");
        const listeners = LISTENER_CONFIGS.filter((config) => config.providerUrl).map((config) => new listener_1.Listener(config));
        console.log(`Created ${listeners.length} listeners`);
        yield Promise.all(listeners.map((listener) => listener.start()));
        console.log("Listeners started");
        // Keep the process running
        console.log("Listener is running... Press Ctrl+C to exit");
    });
}
main().catch((error) => {
    console.error("Main error:", error);
    process.exitCode = 1;
});
// Only start web server if not in test mode
if (process.env.NODE_ENV !== "test") {
    const logger = (0, logger_1.createLogger)("contract-listener");
    const app = (0, express_1.default)();
    const port = process.env.PORT || 8080;
    app.get("/", (_req, res) => res.send(true));
    app.listen(port, () => logger.info(`Server is running on port ${port}`));
}
