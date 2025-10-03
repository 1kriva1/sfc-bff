
import { BasePaginationRequest } from "@core/models";
import { IFindTeamPlayersFilterModel } from "./filters/find-team-players-filter.model";

export interface IFindTeamPlayersRequest extends BasePaginationRequest<IFindTeamPlayersFilterModel> { }