import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { ISchemeGameTeamFormationModel } from "./scheme-game-team-formation.model";
import { ISchemeGameTeamProfileModel } from "./scheme-game-team-profile.model";
import { IGameModel } from "@share/services/game/general/general/models/common/game.model";

export interface ISchemeGameTeamModel {
    Id: number;
    Team: ITeamModel;
    Game: IGameModel;
    Profile: ISchemeGameTeamProfileModel;
    Formation: ISchemeGameTeamFormationModel;
}