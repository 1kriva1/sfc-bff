
import { BasePaginationRequest } from "@core/models";
import { IFindTeamPlayerRequestsFilterModel } from "./filters/find-team-player-requests-filter.model";

export interface IFindTeamPlayerRequestsRequest extends BasePaginationRequest<IFindTeamPlayerRequestsFilterModel> { }