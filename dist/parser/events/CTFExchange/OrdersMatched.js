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
exports.OrdersMatched = void 0;
const logger_1 = require("../../../logger");
const logger = (0, logger_1.createLogger)("CTFExchange-OrdersMatched");
const OrdersMatched = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = context;
    const { blockNumber, blockHash, address, transactionHash, event, parameters, } = evt;
    const [takerOrderHash, takerOrderMaker, makerAssetId, takerAssetId, makerAmountFilled, takerAmountFilled,] = parameters;
    logger.info(`Orders matched - Taker Order: ${takerOrderHash}, Maker: ${takerOrderMaker}`);
    // TODO: Update order status and handle matching data
    // For example:
    // await prisma.ctfOrder.update({ where: { orderHash: takerOrderHash }, data: { matched: true } });
});
exports.OrdersMatched = OrdersMatched;
