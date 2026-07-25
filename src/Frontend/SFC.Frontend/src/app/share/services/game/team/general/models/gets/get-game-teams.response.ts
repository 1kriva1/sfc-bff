import { BaseErrorResponse } from "@core/models";
import { IGameTeamModel } from "../common/game-team.model";

export interface IGetGameTeamsResponse extends BaseErrorResponse {
    GameTeams: IGameTeamModel[];
}