"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEACON_CONTRACT = exports.mockContracts = void 0;
const BeaconABI_1 = require("./BeaconABI");
const MultiTokenContract_json_1 = require("./MultiTokenContract.json");
exports.mockContracts = [
    {
        address: "0x471A4b7de2FE71F44db772122320baB88bFb853C",
        type: "Beacon",
        abi: BeaconABI_1.abi,
    },
    {
        address: "0xEDfA45603964b7b29481B34B519862567c3D579A",
        type: "1155",
        abi: MultiTokenContract_json_1.abi,
    },
];
exports.BEACON_CONTRACT = {
    address: "0x471A4b7de2FE71F44db772122320baB88bFb853C",
    type: "Beacon",
    abi: BeaconABI_1.abi,
};
