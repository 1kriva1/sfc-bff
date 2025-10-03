import { ITeamMainEditFormModel } from "./parts/main/team-main-edit-form.model";
import { ITeamProfileEditFormModel } from "./parts/profile/team-profile-edit-form.model";

export interface ITeamEditFormModel {
    main: ITeamMainEditFormModel;
    profile: ITeamProfileEditFormModel;
}