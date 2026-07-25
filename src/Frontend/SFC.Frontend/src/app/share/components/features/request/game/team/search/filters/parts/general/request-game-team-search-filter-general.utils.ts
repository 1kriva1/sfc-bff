import { IForm } from "@core/types";
import { IRequestGameTeamSearchFilterGeneralModel } from "./request-game-team-search-filter-general.model";

export function buildRequestGameTeamSearchFilterGeneralFormControls(): IForm<IRequestGameTeamSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}