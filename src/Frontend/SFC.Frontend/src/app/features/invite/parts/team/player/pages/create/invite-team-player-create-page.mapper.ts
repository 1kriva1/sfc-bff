import { ICreateTeamPlayerInviteRequest } from "@share/services";
import { InviteTeamPlayerCreatePageFormModel } from "./models/invite-team-player-create-page-form.model";

export function mapCreateTeamPlayerInviteRequest(model: InviteTeamPlayerCreatePageFormModel): ICreateTeamPlayerInviteRequest {
    return {
        Invite: {
            Comment: model.profile.general.comment
        }
    };
}