"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionPreparation_1 = require("./ConditionPreparation");
const ConditionResolution_1 = require("./ConditionResolution");
const PositionSplit_1 = require("./PositionSplit");
const PositionsMerge_1 = require("./PositionsMerge");
const PayoutRedemption_1 = require("./PayoutRedemption");
const TransferSingle_1 = require("./TransferSingle");
const TransferBatch_1 = require("./TransferBatch");
const ApprovalForAll_1 = require("./ApprovalForAll");
const URI_1 = require("./URI");
exports.default = {
    type: "ConditionalTokenFramework",
    parsers: [
        ConditionPreparation_1.ConditionPreparation,
        ConditionResolution_1.ConditionResolution,
        PositionSplit_1.PositionSplit,
        PositionsMerge_1.PositionsMerge,
        PayoutRedemption_1.PayoutRedemption,
        TransferSingle_1.TransferSingle,
        TransferBatch_1.TransferBatch,
        ApprovalForAll_1.ApprovalForAll,
        URI_1.URI,
    ],
};
