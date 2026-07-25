
import { BasePaginationRequest } from "@core/models";
import { IGameTeamPlayerFindFilterModel } from "./filters/game-team-player-find-filter.model";

export interface IGameTeamPlayerFindRequest extends BasePaginationRequest<IGameTeamPlayerFindFilterModel> { }