import { ISchemeGameTeamFormationEditFormModel } from "./parts/formation/scheme-game-team-formation-edit-form.model";
import { ISchemeGameTeamProfileEditFormModel } from "./parts/profile/scheme-game-team-profile-edit-form.model";

export interface ISchemeGameTeamEditFormModel {
    profile: ISchemeGameTeamProfileEditFormModel;
    formation: ISchemeGameTeamFormationEditFormModel;    
}