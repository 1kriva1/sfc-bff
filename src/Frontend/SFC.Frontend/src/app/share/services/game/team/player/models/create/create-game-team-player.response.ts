import { BaseErrorResponse } from "@core/models";
import { IGameTeamPlayerModel } from "../common/game-team-player.model";

export interface ICreateGameTeamPlayerResponse extends BaseErrorResponse {
    GameTeamPlayer: IGameTeamPlayerModel;
}