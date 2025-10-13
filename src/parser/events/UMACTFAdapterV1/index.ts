import { AuthorizedUser } from "./AuthorizedUser";
import { DeauthorizedUser } from "./DeauthorizedUser";
import { NewFinderAddress } from "./NewFinderAddress";
import { QuestionFlaggedForAdminResolution } from "./QuestionFlaggedForAdminResolution";
import { QuestionInitialized } from "./QuestionInitialized";
import { QuestionPaused } from "./QuestionPaused";
import { QuestionReset } from "./QuestionReset";
import { QuestionResolved } from "./QuestionResolved";
import { QuestionSettled } from "./QuestionSettled";
import { QuestionUnpaused } from "./QuestionUnpaused";
import { QuestionUpdated } from "./QuestionUpdated";
import { ResolutionDataRequested } from "./ResolutionDataRequested";

export default {
  type: "UMACTFAdapterV1",
  parsers: [
    AuthorizedUser,
    DeauthorizedUser,
    NewFinderAddress,
    QuestionFlaggedForAdminResolution,
    QuestionInitialized,
    QuestionPaused,
    QuestionReset,
    QuestionResolved,
    QuestionSettled,
    QuestionUnpaused,
    QuestionUpdated,
    ResolutionDataRequested,
  ],
};
