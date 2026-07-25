import { ISchemeGameTeamSearchFilterFormationModel } from "./parts/formation/scheme-game-team-search-filter-formation.model";
import { ISchemeGameTeamSearchFilterGeneralModel } from "./parts/general/scheme-game-team-search-filter-general.model";

export interface ISchemeGameTeamSearchFilterModel {
    name: string | null;
    general: ISchemeGameTeamSearchFilterGeneralModel;
    formation: ISchemeGameTeamSearchFilterFormationModel;
}