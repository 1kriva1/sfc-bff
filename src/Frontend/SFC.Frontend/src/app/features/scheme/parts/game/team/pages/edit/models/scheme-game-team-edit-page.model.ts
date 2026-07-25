import { IGameModel, ISchemeGameTeamModel, ITeamModel } from "@share/models";

export interface ISchemeGameTeamEditPageModel {
    scheme: ISchemeGameTeamModel;
    game: IGameModel;
    team: ITeamModel;
}