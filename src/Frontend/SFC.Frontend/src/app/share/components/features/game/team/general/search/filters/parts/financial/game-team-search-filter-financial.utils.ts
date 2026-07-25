import { IForm } from "@core/types";
import { IGameTeamSearchFilterFinancialModel } from "./game-team-search-filter-financial.model";

export function buildGameTeamSearchFilterFinancialFormControls(): IForm<IGameTeamSearchFilterFinancialModel> {
    return {
        freePlay: [null]
    };
}