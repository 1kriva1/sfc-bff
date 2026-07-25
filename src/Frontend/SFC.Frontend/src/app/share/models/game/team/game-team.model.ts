import { empty } from "ngx-sfc-common";
import { ITeamModel } from "../../team/general/team.model";
import { IGameModel } from "../general/game.model";
import { IGameTeamPlayerModel } from "./game-team-player.model";

export interface IGameTeamEntityModel {
    id: number;
    status: number;
    index: number | empty;
    team?: ITeamModel | empty;
    gameTeamPlayers?: IGameTeamPlayerModel[] | empty;
}

export interface IGameTeamModel {
    game?: IGameModel | empty;
    gameTeam: IGameTeamEntityModel;
}