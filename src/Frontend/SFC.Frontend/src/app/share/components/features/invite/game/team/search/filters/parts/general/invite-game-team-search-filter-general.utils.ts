import { IForm } from "@core/types";
import { IInviteGameTeamSearchFilterGeneralModel } from "./invite-game-team-search-filter-general.model";

export function buildInviteGameTeamSearchFilterGeneralFormControls(): IForm<IInviteGameTeamSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}