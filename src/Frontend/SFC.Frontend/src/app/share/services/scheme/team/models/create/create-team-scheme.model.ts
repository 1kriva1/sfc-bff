import { ITeamSchemeProfileModel } from "@share/services/scheme/team/models/common/team-scheme-profile.model";
import { ICreateTeamSchemeFormationModel } from "./create-team-scheme-formation.model";

export interface ICreateTeamSchemeModel {
    Profile: ITeamSchemeProfileModel;
    Formation: ICreateTeamSchemeFormationModel;
}