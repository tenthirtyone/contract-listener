import { MarketPrepared } from "./MarketPrepared";
import { NewAdmin } from "./NewAdmin";
import { OutcomeReported } from "./OutcomeReported";
import { PayoutRedemption } from "./PayoutRedemption";
import { PositionSplit } from "./PositionSplit";
import { PositionsConverted } from "./PositionsConverted";
import { PositionsMerge } from "./PositionsMerge";
import { QuestionPrepared } from "./QuestionPrepared";
import { RemovedAdmin } from "./RemovedAdmin";

export default {
  type: "NegRiskAdapter",
  parsers: [
    MarketPrepared,
    NewAdmin,
    OutcomeReported,
    PayoutRedemption,
    PositionSplit,
    PositionsConverted,
    PositionsMerge,
    QuestionPrepared,
    RemovedAdmin,
  ],
};
