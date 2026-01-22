import { ISchemeTeamSearchFilterFormationModel } from "./parts/formation/scheme-team-search-filter-formation.model";
import { ISchemeTeamSearchFilterGeneralModel } from "./parts/general/scheme-team-search-filter-general.model";

export interface ISchemeTeamSearchFilterModel {
    name: string | null;
    general: ISchemeTeamSearchFilterGeneralModel;
    formation: ISchemeTeamSearchFilterFormationModel;
}