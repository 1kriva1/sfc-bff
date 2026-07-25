import { BaseErrorResponse } from "@core/models";
import { ITeamSchemeModel } from "@share/services/scheme/team/general/models/common/team-scheme.model";

export interface IGetTeamSchemeResponse extends BaseErrorResponse {
    Scheme: ITeamSchemeModel;
}