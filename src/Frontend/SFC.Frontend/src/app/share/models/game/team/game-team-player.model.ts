import { empty } from "ngx-sfc-common";
import { IPlayerModel } from "@share/models/player/player.model";
import { IGameModel } from "../general/game.model";
import { IGameTeamModel } from "./game-team.model";

export interface IGameTeamPlayerEntityModel {
    id: number;
    status: number;
    player?: IPlayerModel | empty;
    gameTeam?: IGameTeamModel | empty;
}

export interface IGameTeamPlayerModel {
    game?: IGameModel | empty;
    team?: IGameTeamModel | empty;
    gameTeamPlayer: IGameTeamPlayerEntityModel;
}