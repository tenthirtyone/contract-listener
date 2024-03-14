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
exports.ProxyDeployed = void 0;
const TYPE = "ERC1155";
const ProxyDeployed = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma, logger, options } = context;
    const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
    const proxyAddress = args[0];
    yield eventListener.addContract(proxyAddress, TYPE);
    const price = eventListener.price;
    const data = {
        blockNumber,
        blockHash,
        address,
        transactionHash,
        event,
        data: { address: proxyAddress },
        transaction,
        receipt,
        price,
    };
    logger.info(`Update ${proxyAddress} for chain ${options.chain} mined.`);
    yield prisma.collection.update({
        where: {
            address_chain: {
                address: proxyAddress,
                chain: options.chain,
            },
        },
        data: {
            transaction_hash: transactionHash,
            transaction_state: "MINED",
        },
    });
    return data;
});
exports.ProxyDeployed = ProxyDeployed;
