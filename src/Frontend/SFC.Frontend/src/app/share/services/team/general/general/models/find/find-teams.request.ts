
import { BasePaginationRequest } from "@core/models";
import { IFindTeamsFilterModel } from "./filters/find-teams-filter.model";

export interface IFindTeamsRequest extends BasePaginationRequest<IFindTeamsFilterModel> { }