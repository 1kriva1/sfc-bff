import { BaseErrorResponse } from "@core/models";
import { IGameTeamPlayerModel } from "../common/game-team-player.model";

export interface IDeletesGameTeamPlayerResponse extends BaseErrorResponse {
    GameTeamPlayers: IGameTeamPlayerModel[];
}