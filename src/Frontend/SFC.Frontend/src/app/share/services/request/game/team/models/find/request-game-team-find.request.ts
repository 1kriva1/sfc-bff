
import { BasePaginationRequest } from "@core/models";
import { IRequestGameTeamFindFilterModel } from "./filters/request-game-team-find-filter.model";

export interface IRequestGameTeamFindRequest extends BasePaginationRequest<IRequestGameTeamFindFilterModel> { }