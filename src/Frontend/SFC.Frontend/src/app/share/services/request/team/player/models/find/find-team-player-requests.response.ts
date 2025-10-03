import { BaseListResponse } from "@core/models";
import { ITeamPlayerRequestModel } from "@share/services/request/team/player/models/common/team-player-request.model";

export interface IFindTeamPlayerRequestsResponse extends BaseListResponse<ITeamPlayerRequestModel> { }