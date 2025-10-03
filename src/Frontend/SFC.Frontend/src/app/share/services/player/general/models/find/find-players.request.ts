
import { BasePaginationRequest } from "@core/models";
import { IFindPlayersFilterModel } from "./filters/find-players-filter.model";

export interface IFindPlayersRequest extends BasePaginationRequest<IFindPlayersFilterModel> { }