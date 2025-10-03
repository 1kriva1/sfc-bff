import { IInviteTeamPlayerMainEditFormModel } from "./parts/main/invite-team-player-main-edit-form.model";
import { IInviteTeamPlayerProfileEditFormModel } from "./parts/profile/invite-team-player-profile-edit-form.model";

export interface IInviteTeamPlayerEditFormModel {
    main: IInviteTeamPlayerMainEditFormModel;
    profile: IInviteTeamPlayerProfileEditFormModel;
}