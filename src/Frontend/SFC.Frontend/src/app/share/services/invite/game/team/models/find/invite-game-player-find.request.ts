
import { BasePaginationRequest } from "@core/models";
import { IInviteGameTeamFindFilterModel } from "./filters/invite-game-player-find-filter.model";

export interface IInviteGameTeamFindRequest extends BasePaginationRequest<IInviteGameTeamFindFilterModel> { }