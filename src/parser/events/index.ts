import CTFExchange from "./CTFExchange";
import ConditionalTokenFramework from "./ConditionalTokenFramework";
import NegRiskAdapter from "./NegRiskAdapter";
import GnosisSafeFactory from "./GnosisSafeFactory";
import UMACTFAdapterV1 from "./UMACTFAdapterV1";
import UMACTFAdapterV2 from "./UMACTFAdapterV2";
import UMACTFAdapterV3 from "./UMACTFAdapterV3";

export default {
  parsers: [
    CTFExchange,
    ConditionalTokenFramework,
    NegRiskAdapter,
    GnosisSafeFactory,
    UMACTFAdapterV1,
    UMACTFAdapterV2,
    UMACTFAdapterV3,
  ],
};
