import { BaseListResponse } from "@core/models";
import { ITeamSchemeModel } from "@share/services/scheme/team/models/common/team-scheme.model";

export interface IFindTeamSchemesResponse extends BaseListResponse<ITeamSchemeModel> { }