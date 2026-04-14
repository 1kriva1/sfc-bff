import { IGameModel } from "@share/services/game/general/general/models/common/game.model";
import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";

export interface IGameTeamInviteModel {
    Id: number;
    Status: number;
    Game: IGameModel;
    Team: ITeamModel;   
}