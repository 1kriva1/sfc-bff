import { BaseErrorResponse } from "@core/models";
import { ITeamPlayerRequestModel } from "@share/services/request/team/player/models/common/team-player-request.model";

export interface IGetTeamPlayerRequestResponse extends BaseErrorResponse {
    Request: ITeamPlayerRequestModel;
}