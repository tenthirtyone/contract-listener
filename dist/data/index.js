"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABIs = void 0;
const CTFExchange_polygon_json_1 = __importDefault(require("./CTFExchange_polygon.json"));
const ConditionalTokens_polygon_json_1 = __importDefault(require("./ConditionalTokens_polygon.json"));
const NegRiskAdapter_polygon_json_1 = __importDefault(require("./NegRiskAdapter_polygon.json"));
const GnosisSafeFactory_polygon_json_1 = __importDefault(require("./GnosisSafeFactory_polygon.json"));
const UmaCtfAdapter_v1_polygon_json_1 = __importDefault(require("./UmaCtfAdapter_v1_polygon.json"));
const UmaCtfAdapter_v2_polygon_json_1 = __importDefault(require("./UmaCtfAdapter_v2_polygon.json"));
const UmaCtfAdapter_v3_polygon_json_1 = __importDefault(require("./UmaCtfAdapter_v3_polygon.json"));
exports.ABIs = {
    CTFExchange: CTFExchange_polygon_json_1.default,
    ConditionalTokenFramework: ConditionalTokens_polygon_json_1.default,
    NegRiskAdapter: NegRiskAdapter_polygon_json_1.default,
    GnosisSafeFactory: GnosisSafeFactory_polygon_json_1.default,
    UMACTFAdapterV1: UmaCtfAdapter_v1_polygon_json_1.default,
    UMACTFAdapterV2: UmaCtfAdapter_v2_polygon_json_1.default,
    UMACTFAdapterV3: UmaCtfAdapter_v3_polygon_json_1.default,
};
