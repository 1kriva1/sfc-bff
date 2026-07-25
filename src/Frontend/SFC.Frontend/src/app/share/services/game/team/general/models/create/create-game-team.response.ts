import { BaseErrorResponse } from "@core/models";
import { IGameTeamModel } from "../common/game-team.model";

export interface ICreateGameTeamResponse extends BaseErrorResponse{
    Team: IGameTeamModel;
}