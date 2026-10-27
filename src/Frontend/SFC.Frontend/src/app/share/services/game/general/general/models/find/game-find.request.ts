
import { BasePaginationRequest } from "@core/models";
import { IGameFindFilterModel } from "./filters/game-find-filter.model";

export interface IGameFindRequest extends BasePaginationRequest<IGameFindFilterModel> { }