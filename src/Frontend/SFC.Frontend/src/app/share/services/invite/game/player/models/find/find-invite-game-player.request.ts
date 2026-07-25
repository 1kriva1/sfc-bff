
import { BasePaginationRequest } from "@core/models";
import { IFindInviteGamePlayerFilterModel } from "./filters/find-invite-game-player-filter.model";

export interface IFindInviteGamePlayerRequest extends BasePaginationRequest<IFindInviteGamePlayerFilterModel> { }