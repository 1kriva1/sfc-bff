import { ITeamSchemeProfileModel } from "@share/services/scheme/team/general/models/common/team-scheme-profile.model";
import { ISchemeGameTeamFormationUpdateModel } from "./scheme-game-team-formation-update.model";

export interface ISchemeGameTeamUpdateModel {
    Profile: ITeamSchemeProfileModel;
    Formation: ISchemeGameTeamFormationUpdateModel;
}