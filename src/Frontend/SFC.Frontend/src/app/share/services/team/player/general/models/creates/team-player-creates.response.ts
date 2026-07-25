import { BaseErrorResponse } from "@core/models";
import { ITeamPlayerModel } from "../common/team-player.model";

export interface ITeamPlayerCreatesResponse extends BaseErrorResponse {
    TeamPlayers: ITeamPlayerModel[];
}