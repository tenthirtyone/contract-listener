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
exports.TransferSingle = void 0;
const logger_1 = require("@/logger");
const utils_1 = require("@/utils");
const logger = (0, logger_1.createLogger)("TransferSingle");
const TransferSingle = (evt, eventListener) => __awaiter(void 0, void 0, void 0, function* () {
    const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
    const operator = args[0];
    const from = args[1];
    const to = args[2];
    const tokenId = args[3].toNumber();
    const value = args[4].toNumber();
    const { transaction, receipt } = yield (0, utils_1.getTransactionData)(transactionHash);
    const price = eventListener.price;
    const data = {
        blockNumber,
        blockHash,
        address,
        transactionHash,
        event,
        data: { operator, from, to, tokenId, value },
        transaction,
        receipt,
        price
    };
    logger.info(data);
    return data;
});
exports.TransferSingle = TransferSingle;
