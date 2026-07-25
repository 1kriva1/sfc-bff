import { BaseErrorResponse } from "@core/models";
import { ISchemeGameTeamModel } from "../common/scheme-game-team.model";

export interface ISchemeGameTeamCreateResponse extends BaseErrorResponse {
    Scheme: ISchemeGameTeamModel;
}