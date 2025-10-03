import { ISchemeTeamFormationEditFormModel } from "./formation/scheme-team-formation-edit-form.model";
import { ISchemeTeamProfileEditFormModel } from "./profile/scheme-team-profile-edit-form.model";

export interface ISchemeTeamEditFormModel {
    profile: ISchemeTeamProfileEditFormModel;
    formation: ISchemeTeamFormationEditFormModel;
}