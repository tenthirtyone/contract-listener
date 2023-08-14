"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABIs = void 0;
__exportStar(require("./contracts"), exports);
__exportStar(require("./webhooks"), exports);
const BeaconABI_1 = require("./BeaconABI");
const MultiTokenContract_json_1 = require("./MultiTokenContract.json");
exports.ABIs = {
    "Beacon": BeaconABI_1.abi,
    "ERC1155": MultiTokenContract_json_1.abi
};
