import { IForm } from "@core/types";
import { ISchemeTeamSearchFilterFormationModel } from "./scheme-team-search-filter-formation.model";

export function buildSchemeTeamSearchFilterFormationFormControls(): IForm<ISchemeTeamSearchFilterFormationModel> {
    return {
        formation: [null],
        raiting: [null]
    }
}