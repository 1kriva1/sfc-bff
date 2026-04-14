import { BaseErrorResponse } from "@core/models";
import { IGameTeamInviteModel } from "../common/game-team-invite.model";

export interface ICreateGameTeamInvitesResponse extends BaseErrorResponse {
    Invites: IGameTeamInviteModel[];
}