import { empty } from "ngx-sfc-common";
import { IGameModel } from "../game";
import { ITeamModel } from "../team";

export interface IInviteGameTeamModel {
    id: number;
    status: number;
    gameComment: string;
    teamComment: string | empty;
    game: IGameModel;
    team: ITeamModel;
}