import { BasePaginationRequest } from "@core/models";
import { IGetBadgesFilterModel } from "./filters/get-badges-filter.model";

export interface IGetBadgesRequest extends BasePaginationRequest<IGetBadgesFilterModel> { }