import { IForm } from "@core/types";
import { IInviteGamePlayerSearchFilterGeneralModel } from "./invite-game-player-search-filter-general.model";

export function buildInviteGamePlayerSearchFilterGeneralFormControls(): IForm<IInviteGamePlayerSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}