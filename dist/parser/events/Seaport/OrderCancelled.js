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
exports.OrderCancelled = void 0;
const logger_1 = require("../../../logger");
const logger = (0, logger_1.createLogger)("Seaport-OrderCancelled");
const OrderCancelled = (evt, eventListener, transaction, receipt, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma, opensearch, seaport } = context;
    const { blockNumber, blockHash, address, transactionHash, event, args } = evt;
    const [orderHash, offerer, zone] = args;
    logger.info(`tx:${transactionHash} | order:${orderHash}`);
    const order = yield getSeaportOrder(orderHash);
    if (!order)
        return;
    yield fulfillSeaportOrder(orderHash);
    const seaportData = JSON.parse(order.fulfillment_data);
    for (const offer of seaportData.offers) {
        //const document = await getDocument(offer.offerToken, offer.offerIdentifier);
        const document = yield getDocument(offer.offerToken, offer.offerIdentifier);
        if (document) {
            // Remove the offer from the list of offers.
            document.offers = document.offers.filter((docOffer) => {
                const documentOrderHash = seaport.getOrderHash(docOffer.parameters);
                return documentOrderHash !== orderHash;
            });
            // UPDATE HTE PRICE ON THE LISTING TO BE THE NEXT OFFER;
            // put the document back in the index
            putDocument(document);
        }
        else {
            logger.warn(`Document not found for token ${offer.offerToken} and identifier ${offer.offerIdentifier}`);
        }
    }
    function getSeaportOrder(orderHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.seaportOrder.findFirst({
                    where: {
                        order_hash: orderHash,
                    },
                });
            }
            catch (error) {
                if (error.code === "P2025") {
                    // Handle not found error
                    logger.warn(`orderHash: ${orderHash}: was not found.`);
                }
                else {
                    // Handle other kinds of errors
                    logger.error("Error finding order:", error);
                }
            }
        });
    }
    function fulfillSeaportOrder(orderHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beforeCount = yield prisma.seaportOrder.count({
                    where: {
                        fulfilled: true,
                    },
                });
                yield prisma.seaportOrder.update({
                    where: {
                        order_hash: orderHash,
                    },
                    data: {
                        fulfilled: true,
                    },
                });
                logger.info("Order updated:", orderHash);
                const afterCount = yield prisma.seaportOrder.count({
                    where: {
                        fulfilled: true,
                    },
                });
                console.log(beforeCount);
                console.log(afterCount);
            }
            catch (error) {
                if (error.code === "P2025") {
                    // Handle not found error
                    logger.warn(`orderHash: ${orderHash}: was not found.`);
                }
                else {
                    // Handle other kinds of errors
                    logger.error("Error updating order:", error);
                }
            }
        });
    }
    function getDocument(tokenAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield opensearch.search({
                    index: "landingpage",
                    body: {
                        query: {
                            bool: {
                                must: [
                                    { match: { token_address: tokenAddress } },
                                    { match: { token_id: tokenId } },
                                ],
                            },
                        },
                    },
                });
                // Assuming the document you need is the first hit
                return response.body.hits.hits.length > 0
                    ? response.body.hits.hits[0]._source
                    : null;
            }
            catch (error) {
                console.error("Error fetching document:", error);
                throw error;
            }
        });
    }
    function putDocument(document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield opensearch.index({
                    index: "landingpage",
                    id: document.id,
                    body: document,
                });
                console.log(response);
            }
            catch (error) {
                console.error("Error in putDocument:", error);
            }
        });
    }
    return;
});
exports.OrderCancelled = OrderCancelled;
