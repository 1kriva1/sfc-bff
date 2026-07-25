import { IForm } from "@core/types";
import { ISchemeGameTeamSearchFilterFormationModel } from "./scheme-game-team-search-filter-formation.model";

export function buildSchemeGameTeamSearchFilterFormationFormControls(): IForm<ISchemeGameTeamSearchFilterFormationModel> {
    return {
        formation: [null],
        raiting: [null]
    }
}