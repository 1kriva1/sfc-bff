import { IFindTeamSchemesFormationFilterModel } from "./find-team-schemes-formation-filter.model";
import { IFindTeamSchemesProfileFilterModel } from "./find-team-schemes-profile-filter.model";

export interface IFindTeamSchemesFilterModel {
    Profile: IFindTeamSchemesProfileFilterModel;
    Formation: IFindTeamSchemesFormationFilterModel;
}