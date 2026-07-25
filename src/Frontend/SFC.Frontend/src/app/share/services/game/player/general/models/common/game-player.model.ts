import { IGameTeamModel } from "@share/services/game/team/general/models/common/game-team.model";
import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { empty } from "ngx-sfc-common";

export interface IGamePlayerModel {
    Id: number;
    Status: number;
    Player?: IPlayerModel | empty;
    GameTeam?: IGameTeamModel | empty;
}