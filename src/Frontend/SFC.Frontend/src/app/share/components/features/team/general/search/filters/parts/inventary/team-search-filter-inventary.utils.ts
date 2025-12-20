import { IForm } from "@core/types";
import { ITeamSearchFilterInventaryModel } from "./team-search-filter-inventary.model";

export function buildTeamSearchFilterInventaryFormGroup(): IForm<ITeamSearchFilterInventaryModel> {
    return {
        shirts: [null]
    };
}