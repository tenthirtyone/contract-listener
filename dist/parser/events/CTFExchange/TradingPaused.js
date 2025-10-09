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
exports.TradingPaused = void 0;
const logger_1 = require("../../../logger");
const logger = (0, logger_1.createLogger)("CTFExchange-TradingPaused");
const TradingPaused = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = context;
    const { blockNumber, blockHash, address, transactionHash, event, parameters, } = evt;
    const [pauser] = parameters;
    logger.info(`Trading paused by: ${pauser}`);
    // TODO: Update trading status in database
    // For example: await prisma.ctfConfig.update({ where: { key: 'tradingPaused' }, data: { value: true } });
});
exports.TradingPaused = TradingPaused;
