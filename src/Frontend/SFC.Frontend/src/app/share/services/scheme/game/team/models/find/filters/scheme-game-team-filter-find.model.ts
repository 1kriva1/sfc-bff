import { ISchemeGameTeamFormationFilterFindModel } from "./scheme-game-team-formation-filter-find.model";
import { ISchemeGameTeamProfileFilterFindModel } from "./scheme-game-team-profile-filter-find.model";

export interface ISchemeGameTeamFilterFindModel {
    Profile: ISchemeGameTeamProfileFilterFindModel;
    Formation: ISchemeGameTeamFormationFilterFindModel;
}