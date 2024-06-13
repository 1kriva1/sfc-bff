
import { BasePaginationRequest } from "@core/models";
import { IGetGamesFilterModel } from "./filters/get-games-filter.model";

export interface IGetGamesRequest extends BasePaginationRequest<IGetGamesFilterModel> { }