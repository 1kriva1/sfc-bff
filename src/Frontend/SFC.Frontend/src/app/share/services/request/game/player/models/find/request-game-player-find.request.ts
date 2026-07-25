
import { BasePaginationRequest } from "@core/models";
import { IRequestGamePlayerFindFilterModel } from "./filters/request-game-player-find-filter.model";

export interface IRequestGamePlayerFindRequest extends BasePaginationRequest<IRequestGamePlayerFindFilterModel> { }