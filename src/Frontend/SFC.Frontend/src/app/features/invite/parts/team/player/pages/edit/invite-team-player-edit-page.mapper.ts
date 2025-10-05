import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { IUpdateTeamPlayerInviteRequest } from "@share/services";
import { IInviteTeamPlayerEditFormModel } from "../../components/edit/invite-team-player-edit-form.model";

export function mapTeamInvitePlayerEditFormModel(value: ITeamPlayerInviteModel): IInviteTeamPlayerEditFormModel {
    return {
        main: {
            teamId: value.team.id,
            playerId: value.player.id
        },
        profile: {
            general: {
                comment: value.teamComment
            },
            football: {
                footballPositions: null,
                mainSquad: false,
                number: null
            }
        }
    };
}

export function mapUpdateTeamPlayerInviteRequest(value: IInviteTeamPlayerEditFormModel): IUpdateTeamPlayerInviteRequest {
    return {
        Invite: {
            Comment: value.profile.general.comment
        }
    };
}