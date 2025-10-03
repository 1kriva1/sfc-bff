import { IInviteTeamPlayerProfileFootballEditFormModel } from "./parts/football/invite-team-player-profile-football-edit-form.model";
import { IInviteTeamPlayerProfileGeneralEditFormModel } from "./parts/general/invite-team-player-profile-general-edit-form.model";

export interface IInviteTeamPlayerProfileEditFormModel {
    general: IInviteTeamPlayerProfileGeneralEditFormModel;
    football: IInviteTeamPlayerProfileFootballEditFormModel;
}