import { BaseErrorResponse } from "@core/models";
import { ITeamPlayerInviteModel } from "../common/team-player-invite.model";

export interface ICreateTeamPlayerInvitesResponse extends BaseErrorResponse {
    Invites: ITeamPlayerInviteModel[];
}