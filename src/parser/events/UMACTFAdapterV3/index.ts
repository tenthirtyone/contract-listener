import { AncillaryDataUpdated } from "./AncillaryDataUpdated";
import { NewAdmin } from "./NewAdmin";
import { QuestionEmergencyResolved } from "./QuestionEmergencyResolved";
import { QuestionFlagged } from "./QuestionFlagged";
import { QuestionInitialized } from "./QuestionInitialized";
import { QuestionPaused } from "./QuestionPaused";
import { QuestionReset } from "./QuestionReset";
import { QuestionResolved } from "./QuestionResolved";
import { QuestionUnflagged } from "./QuestionUnflagged";
import { QuestionUnpaused } from "./QuestionUnpaused";
import { RemovedAdmin } from "./RemovedAdmin";

export default {
  type: "UMACTFAdapterV3",
  parsers: [
    AncillaryDataUpdated,
    NewAdmin,
    QuestionEmergencyResolved,
    QuestionFlagged,
    QuestionInitialized,
    QuestionPaused,
    QuestionReset,
    QuestionResolved,
    QuestionUnflagged,
    QuestionUnpaused,
    RemovedAdmin,
  ],
};
