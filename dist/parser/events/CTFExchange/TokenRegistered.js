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
exports.TokenRegistered = void 0;
const logger_1 = require("../../../logger");
const logger = (0, logger_1.createLogger)("CTFExchange-TokenRegistered");
const TokenRegistered = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger: contextLogger } = context;
    const { blockNumber, blockHash, address, transactionHash, event, parameters, } = evt;
    const [token0, token1, conditionId] = parameters;
    logger.info(`Token registered - Token0: ${token0}, Token1: ${token1}, ConditionId: ${conditionId}`);
    // TODO: Store token registration in database
    // Note: Prisma is not available in library mode - use external database connections
});
exports.TokenRegistered = TokenRegistered;
