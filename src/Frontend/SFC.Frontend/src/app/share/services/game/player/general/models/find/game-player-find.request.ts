
import { BasePaginationRequest } from "@core/models";
import { IGamePlayerFindFilterModel } from "./filters/game-player-find-filter.model";

export interface IGamePlayerFindRequest extends BasePaginationRequest<IGamePlayerFindFilterModel> { }