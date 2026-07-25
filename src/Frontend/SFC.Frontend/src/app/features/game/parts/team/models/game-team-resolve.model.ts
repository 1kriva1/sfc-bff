import { IGameModel, IGameTeamModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface IGameTeamResolveModel {
    game: IGameModel;
    gameTeam?: IGameTeamModel | empty;
}