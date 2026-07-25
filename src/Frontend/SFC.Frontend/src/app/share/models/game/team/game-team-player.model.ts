import { empty } from "ngx-sfc-common";
import { ITeamModel } from "../../team/general/team.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { IGameModel } from "../general/game.model";
import { IGameTeamModel } from "./game-team.model";

export interface IGameTeamPlayerEntityModel {
    id: number;
    status: number;
    player?: IPlayerModel | empty;
    team?: ITeamModel | empty;
}

export interface IGameTeamPlayerModel {
    game?: IGameModel | empty;
    team?: IGameTeamModel | empty;
    gameTeamPlayer: IGameTeamPlayerEntityModel;
}