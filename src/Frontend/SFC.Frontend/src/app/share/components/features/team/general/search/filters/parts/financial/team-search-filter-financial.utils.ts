import { IForm } from "@core/types";
import { ITeamSearchFilterFinancialModel } from "./team-search-filter-financial.model";

export function buildTeamSearchFilterFinancialFormControls(): IForm<ITeamSearchFilterFinancialModel> {
    return {
        freePlay: [null]
    };
}