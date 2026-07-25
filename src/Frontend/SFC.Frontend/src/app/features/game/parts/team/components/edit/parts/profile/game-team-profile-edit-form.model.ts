import { IGameTeamGeneralProfileEditFormModel } from "./parts/general/game-team-general-profile-edit-form.model";
import { IGameTeamInventaryProfileEditFormModel } from "./parts/inventary/game-team-inventary-profile-edit-form.model";

export interface IGameTeamProfileEditFormModel {
    general: IGameTeamGeneralProfileEditFormModel;
    inventary: IGameTeamInventaryProfileEditFormModel;
}