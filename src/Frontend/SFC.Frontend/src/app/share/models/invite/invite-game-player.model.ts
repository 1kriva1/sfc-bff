import { empty } from "ngx-sfc-common";
import { IPlayerModel } from "../player/player.model";
import { IGameModel } from "../game";

export interface IInviteGamePlayerModel {
    id: number;
    status: number;
    gameComment: string;
    playerComment: string | empty;
    player: IPlayerModel;
    game: IGameModel;
}