import { BaseErrorResponse } from "@core/models";
import { ISchemeGameTeamModel } from "../common/scheme-game-team.model";

export interface ISchemeGameTeamGetResponse extends BaseErrorResponse {
    Scheme: ISchemeGameTeamModel;
}