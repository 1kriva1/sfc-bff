import { BaseErrorResponse } from "@core/models";
import { IGameTeamModel } from "../common/game-team.model";

export interface IGetGameTeamResponse extends BaseErrorResponse {
    GameTeam: IGameTeamModel;
}