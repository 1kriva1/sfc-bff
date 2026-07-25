
import { BasePaginationRequest } from "@core/models";
import { IFindTeamSchemesFilterModel } from "./filters/find-team-schemes-filter.model";

export interface IFindTeamSchemesRequest extends BasePaginationRequest<IFindTeamSchemesFilterModel> { }