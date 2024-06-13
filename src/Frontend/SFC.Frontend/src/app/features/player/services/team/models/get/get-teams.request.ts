
import { BasePaginationRequest } from "@core/models";
import { IGetTeamsFilterModel } from "./filters/get-teams-filter.model";

export interface IGetTeamsRequest extends BasePaginationRequest<IGetTeamsFilterModel> { }