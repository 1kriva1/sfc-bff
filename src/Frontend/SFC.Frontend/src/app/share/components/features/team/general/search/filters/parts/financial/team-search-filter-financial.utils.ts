import { IForm } from "@core/types";
import { ITeamSearchFilterFinancialModel } from "./team-search-filter-financial.model";

export function buildTeamSearchFilterFinancialFormGroup(): IForm<ITeamSearchFilterFinancialModel> {
    return {
        freePlay: [null]
    };
}