import { IForm } from "@core/types";
import { ITeamPlayerSearchFilterGeneralModel } from "./team-player-search-filter-general.model";

export function buildTeamPlayerSearchFilterGeneralFormControls(): IForm<ITeamPlayerSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}