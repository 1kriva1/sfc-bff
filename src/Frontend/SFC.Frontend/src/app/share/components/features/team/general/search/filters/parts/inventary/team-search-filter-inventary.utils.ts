import { IForm } from "@core/types";
import { ITeamSearchFilterInventaryModel } from "./team-search-filter-inventary.model";

export function buildTeamSearchFilterInventaryFormControls(): IForm<ITeamSearchFilterInventaryModel> {
    return {
        shirts: [null]
    };
}