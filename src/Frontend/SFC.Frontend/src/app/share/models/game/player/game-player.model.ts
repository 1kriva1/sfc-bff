import { IPlayerModel } from "@share/models/player/player.model";
import { IGameTeamModel } from "../team/game-team.model";
import { empty } from "ngx-sfc-common";
import { IGameModel } from "../general/game.model";

export interface IGamePlayerEntityModel {
    id: number;
    status: number;
    player?: IPlayerModel | empty;
    gameTeam?: IGameTeamModel | empty;
}

export interface IGamePlayerModel {
    game?: IGameModel | empty;
    gamePlayer: IGamePlayerEntityModel;
}