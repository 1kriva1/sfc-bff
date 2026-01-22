import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { ITeamSchemeFormationModel } from "./team-scheme-formation.model";
import { ITeamSchemeProfileModel } from "./team-scheme-profile.model";

export interface ITeamSchemeModel {
    Id: number;
    Team: ITeamModel;
    Profile: ITeamSchemeProfileModel;
    Formation: ITeamSchemeFormationModel;
}