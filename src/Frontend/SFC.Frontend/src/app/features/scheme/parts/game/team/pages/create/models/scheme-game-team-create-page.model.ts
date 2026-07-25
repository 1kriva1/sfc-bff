import { IGameModel, ITeamModel } from "@share/models";

export interface ISchemeGameTeamCreatePageModel { 
    game: IGameModel;
    team: ITeamModel;
}