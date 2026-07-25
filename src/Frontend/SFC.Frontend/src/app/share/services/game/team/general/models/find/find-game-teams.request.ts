
import { BasePaginationRequest } from "@core/models";
import { IFindGameTeamsFilterModel } from "./filters/find-game-teams-filter.model";

export interface IFindGameTeamsRequest extends BasePaginationRequest<IFindGameTeamsFilterModel> { }