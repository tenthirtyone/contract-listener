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
exports.RemovedOperator = void 0;
const logger_1 = require("../../../logger");
const logger = (0, logger_1.createLogger)("CTFExchange-RemovedOperator");
const RemovedOperator = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = context;
    const { blockNumber, blockHash, address, transactionHash, event, parameters, } = evt;
    const [removedOperator, admin] = parameters;
    logger.info(`Operator removed - Address: ${removedOperator}, By: ${admin}`);
    // TODO: Update operator status in database
    // For example: await prisma.operator.update({ where: { address: removedOperator }, data: { active: false } });
});
exports.RemovedOperator = RemovedOperator;
