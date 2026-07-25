import { ITeamSchemeProfileModel } from "@share/services/scheme/team/general/models/common/team-scheme-profile.model";
import { IUpdateTeamSchemeFormationModel } from "./update-team-scheme-formation.model";

export interface IUpdateTeamSchemeModel {
    Profile: ITeamSchemeProfileModel;
    Formation: IUpdateTeamSchemeFormationModel;
}