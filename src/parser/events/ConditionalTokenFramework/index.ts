import { ConditionPreparation } from "./ConditionPreparation";
import { ConditionResolution } from "./ConditionResolution";
import { PositionSplit } from "./PositionSplit";
import { PositionsMerge } from "./PositionsMerge";
import { PayoutRedemption } from "./PayoutRedemption";
import { TransferSingle } from "./TransferSingle";
import { TransferBatch } from "./TransferBatch";
import { ApprovalForAll } from "./ApprovalForAll";
import { URI } from "./URI";

export default {
  type: "ConditionalTokenFramework",
  parsers: [
    ConditionPreparation,
    ConditionResolution,
    PositionSplit,
    PositionsMerge,
    PayoutRedemption,
    TransferSingle,
    TransferBatch,
    ApprovalForAll,
    URI,
  ],
};
