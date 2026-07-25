import { BaseErrorResponse } from "@core/models";
import { IInviteGameTeamModel } from "../common/invite-game-team.model";

export interface ICreateGameTeamInvitesResponse extends BaseErrorResponse {
    Invites: IInviteGameTeamModel[];
}