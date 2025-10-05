
import { BasePaginationRequest } from "@core/models";
import { IFindTeamPlayerInvitesFilterModel } from "./filters/find-team-player-invites-filter.model";

export interface IFindTeamPlayerInvitesRequest extends BasePaginationRequest<IFindTeamPlayerInvitesFilterModel> { }