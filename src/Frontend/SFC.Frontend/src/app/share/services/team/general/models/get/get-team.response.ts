import { BaseErrorResponse } from "@core/models";
import { ITeamModel } from "@share/services/team/general/models/common/team.model";

export interface IGetTeamResponse extends BaseErrorResponse {
    Team: ITeamModel;
}