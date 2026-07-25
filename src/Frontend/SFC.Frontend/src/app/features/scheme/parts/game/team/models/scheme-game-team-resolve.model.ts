import { IGameModel, ISchemeGameTeamModel, ITeamModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface ISchemeGameTeamResolveModel {
    scheme?: ISchemeGameTeamModel | empty;
    game: IGameModel;
    team: ITeamModel;
}