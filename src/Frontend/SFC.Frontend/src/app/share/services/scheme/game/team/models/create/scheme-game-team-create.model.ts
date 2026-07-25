import { ITeamSchemeProfileModel } from "@share/services/scheme/team/general/models/common/team-scheme-profile.model";
import { ISchemeGameTeamFormationCreateModel } from "./scheme-game-team-formation-create.model";

export interface ISchemeGameTeamCreateModel {
    Profile: ITeamSchemeProfileModel;
    Formation: ISchemeGameTeamFormationCreateModel;
}