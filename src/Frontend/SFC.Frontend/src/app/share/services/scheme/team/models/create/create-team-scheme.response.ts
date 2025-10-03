import { BaseErrorResponse } from "@core/models";
import { ITeamSchemeModel } from "@share/services/scheme/team/models/common/team-scheme.model";

export interface ICreateTeamSchemeResponse extends BaseErrorResponse {
    Scheme: ITeamSchemeModel;
}