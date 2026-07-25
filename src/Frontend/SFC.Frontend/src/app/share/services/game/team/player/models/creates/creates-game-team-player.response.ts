import { BaseErrorResponse } from "@core/models";
import { IGameTeamPlayerModel } from "../common/game-team-player.model";

export interface ICreatesGameTeamPlayerResponse extends BaseErrorResponse {
    GameTeamPlayers: IGameTeamPlayerModel[];
}