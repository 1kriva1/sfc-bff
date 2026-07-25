import { IGameModel } from "@share/services/game/general/general/models/common/game.model";
import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { empty } from "ngx-sfc-common";

export interface IInviteGamePlayerModel {
    Id: number;
    Status: number;
    GameComment: string;
    PlayerComment: string | empty;
    Game: IGameModel;
    Player: IPlayerModel;    
}