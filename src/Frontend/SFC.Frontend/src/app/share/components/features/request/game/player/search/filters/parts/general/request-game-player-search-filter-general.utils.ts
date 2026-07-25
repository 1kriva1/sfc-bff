import { IForm } from "@core/types";
import { IRequestGamePlayerSearchFilterGeneralModel } from "./request-game-player-search-filter-general.model";

export function buildRequestGamePlayerSearchFilterGeneralFormControls(): IForm<IRequestGamePlayerSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}