import { IGameModel, IGameTeamModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface IGameEditPageTeamModel {
    a: IGameTeamModel | empty;
    b: IGameTeamModel | empty;
}

export interface IGameEditPageModel {
    game: IGameModel;
    gameTeam: IGameEditPageTeamModel;
}