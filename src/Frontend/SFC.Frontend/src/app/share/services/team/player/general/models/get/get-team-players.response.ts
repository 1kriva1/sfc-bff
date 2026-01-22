import { BaseErrorResponse } from "@core/models";
import { ITeamPlayerModel } from "@share/services/team/player/general/models/common/team-player.model";

export interface IGetTeamPlayersResponse extends BaseErrorResponse {
    TeamPlayers: ITeamPlayerModel[];
}