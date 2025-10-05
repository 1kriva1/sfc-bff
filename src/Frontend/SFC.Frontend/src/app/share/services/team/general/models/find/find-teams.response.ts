import { BaseListResponse } from "@core/models";
import { ITeamModel } from "../common/team.model";

export interface IFindTeamsResponse extends BaseListResponse<ITeamModel> { }