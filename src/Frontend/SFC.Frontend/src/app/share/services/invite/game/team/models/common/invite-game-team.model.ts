import { IGameModel } from "@share/services/game/general/general/models/common/game.model";
import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { empty } from "ngx-sfc-common";

export interface IInviteGameTeamModel {
    Id: number;
    Status: number;
    GameComment: string;
    TeamComment: string | empty;
    Game: IGameModel;
    Team: ITeamModel;
}