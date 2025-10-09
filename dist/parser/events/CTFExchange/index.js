"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FeeCharged_1 = require("./FeeCharged");
const NewAdmin_1 = require("./NewAdmin");
const NewOperator_1 = require("./NewOperator");
const OrderCancelled_1 = require("./OrderCancelled");
const OrderFilled_1 = require("./OrderFilled");
const OrdersMatched_1 = require("./OrdersMatched");
const ProxyFactoryUpdated_1 = require("./ProxyFactoryUpdated");
const RemovedAdmin_1 = require("./RemovedAdmin");
const RemovedOperator_1 = require("./RemovedOperator");
const SafeFactoryUpdated_1 = require("./SafeFactoryUpdated");
const TokenRegistered_1 = require("./TokenRegistered");
const TradingPaused_1 = require("./TradingPaused");
const TradingUnpaused_1 = require("./TradingUnpaused");
exports.default = {
    name: "CTFExchange",
    parsers: [
        FeeCharged_1.FeeCharged,
        NewAdmin_1.NewAdmin,
        NewOperator_1.NewOperator,
        OrderCancelled_1.OrderCancelled,
        OrderFilled_1.OrderFilled,
        OrdersMatched_1.OrdersMatched,
        ProxyFactoryUpdated_1.ProxyFactoryUpdated,
        RemovedAdmin_1.RemovedAdmin,
        RemovedOperator_1.RemovedOperator,
        SafeFactoryUpdated_1.SafeFactoryUpdated,
        TokenRegistered_1.TokenRegistered,
        TradingPaused_1.TradingPaused,
        TradingUnpaused_1.TradingUnpaused,
    ],
};
