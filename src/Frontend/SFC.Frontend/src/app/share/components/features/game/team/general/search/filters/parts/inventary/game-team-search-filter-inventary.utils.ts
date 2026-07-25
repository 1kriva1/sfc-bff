import { IForm } from "@core/types";
import { IGameTeamSearchFilterInventaryModel } from "./game-team-search-filter-inventary.model";

export function buildGameTeamSearchFilterInventaryFormControls(): IForm<IGameTeamSearchFilterInventaryModel> {
    return {
        shirts: [null]
    };
}