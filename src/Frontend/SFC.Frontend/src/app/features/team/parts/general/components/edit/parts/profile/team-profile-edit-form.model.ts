import { ITeamAvailabilityProfileEditFormModel } from "./parts/availability/team-availability-profile-edit-form.model";
import { ITeamFinancialProfileEditFormModel } from "./parts/financial/team-financial-profile-edit-form.model";
import { ITeamGeneralProfileEditFormModel } from "./parts/general/team-general-profile-edit-form.model";

export interface ITeamProfileEditFormModel {
    general: ITeamGeneralProfileEditFormModel;
    availability: ITeamAvailabilityProfileEditFormModel;
    financial: ITeamFinancialProfileEditFormModel;
}