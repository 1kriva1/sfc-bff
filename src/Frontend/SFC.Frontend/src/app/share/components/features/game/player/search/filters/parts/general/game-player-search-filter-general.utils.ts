import { IForm } from "@core/types";
import { IGamePlayerSearchFilterGeneralModel } from "./game-player-search-filter-general.model";

export function buildGamePlayerSearchFilterGeneralFormControls(): IForm<IGamePlayerSearchFilterGeneralModel> {
    return {
        statuses: [null]
    }
}