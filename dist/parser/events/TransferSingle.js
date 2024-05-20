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
const logger_1 = require("../../logger");
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const logger = (0, logger_1.createLogger)("TransferSingle");
const TransferSingle = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma, logger, options } = context;
    const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
    const operator = args[0];
    const from = args[1];
    const to = args[2];
    const tokenId = args[3].toNumber();
    const value = args[4].toNumber();
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
        price,
    };
    if (from === ZERO_ADDRESS) {
        try {
            let sparseNft = yield getSparseNft({
                chain: options.chain,
                address,
                identifier: tokenId.toString(),
                transaction_hash: transactionHash,
            });
            // If this is a lazy mint token, the data will already exist
            if (sparseNft) {
                delete sparseNft.id;
                delete sparseNft.createdAt;
                delete sparseNft.updatedAt;
                yield createNft(Object.assign(Object.assign({}, sparseNft), { identifier: tokenId.toString(), chain: options.chain, transaction_hash: transactionHash }));
                yield incrementCollectionSupply({
                    chain: options.chain,
                    address,
                });
            }
            yield updateOrCreateBalance({
                chain: options.chain,
                token_address: address,
                identifier: tokenId.toString(),
                user_address: to,
                incrementBy: value,
            });
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
    }
    else {
        try {
            // update the ownership balance
            yield updateOrCreateBalance({
                chain: options.chain,
                token_address: address,
                identifier: tokenId.toString(),
                user_address: to,
                incrementBy: value,
            });
            yield updateOrCreateBalance({
                chain: options.chain,
                token_address: address,
                identifier: tokenId.toString(),
                user_address: from,
                incrementBy: -value,
            });
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
    }
    return data;
    function getSparseNft({ chain, address, identifier, transaction_hash, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.sparseNft.findFirst({
                where: {
                    chain,
                    address,
                    OR: [{ identifier }, { transaction_hash }],
                },
            });
        });
    }
    function createNft({ chain, address, identifier, supply, name, image, transaction_hash, description, media, attributes, creator, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.nft.create({
                data: {
                    identifier,
                    supply,
                    name,
                    image,
                    transaction_hash,
                    description,
                    media,
                    attributes,
                    creator,
                    collection: {
                        connect: {
                            address_chain: {
                                address,
                                chain,
                            },
                        },
                    },
                },
            });
        });
    }
    function incrementCollectionSupply({ chain, address }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.collection.update({
                where: {
                    address_chain: {
                        address,
                        chain,
                    },
                },
                data: {
                    total_supply: {
                        increment: 1,
                    },
                },
            });
        });
    }
    function updateOrCreateBalance({ chain, token_address, identifier, user_address, incrementBy, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try to find an existing balance record
            const existingBalance = yield prisma.nftOwners.findUnique({
                where: {
                    chain_token_address_identifier_user_address: {
                        chain,
                        token_address,
                        identifier,
                        user_address,
                    },
                },
            });
            if (existingBalance) {
                // If found, increment the balance
                return yield prisma.nftOwners.update({
                    where: {
                        chain_token_address_identifier_user_address: {
                            chain,
                            token_address,
                            identifier,
                            user_address,
                        },
                    },
                    data: {
                        balance: {
                            increment: incrementBy,
                        },
                    },
                });
            }
            else {
                // If not found, create a new balance record
                return yield prisma.nftOwners.create({
                    data: {
                        chain,
                        token_address,
                        identifier,
                        user_address,
                        balance: incrementBy,
                    },
                });
            }
        });
    }
});
exports.TransferSingle = TransferSingle;
