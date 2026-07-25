import { IGameModel, IGameTeamModel } from "@share/models/game";

export interface IGameTeamEditPageModel {
    game: IGameModel;
    gameTeam: IGameTeamModel;
}