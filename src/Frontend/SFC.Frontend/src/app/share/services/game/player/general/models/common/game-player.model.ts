import { IGameTeamPlayerModel } from "@share/services/game/team/player/models/common/game-team-player.model";
import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { empty } from "ngx-sfc-common";

export interface IGamePlayerModel {
    Id: number;
    Status: number;
    Player?: IPlayerModel | empty;
    GameTeamPlayer?: IGameTeamPlayerModel | empty;
}