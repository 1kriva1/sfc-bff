import { IGameFinancialProfileEditFormModel } from "./parts/financial/game-financial-profile-edit-form.model";
import { IGameGeneralProfileEditFormModel } from "./parts/general/game-general-profile-edit-form.model";
import { IGameInventaryProfileEditFormModel } from "./parts/inventary/game-inventary-profile-edit-form.model";

export interface IGameProfileEditFormModel {
    general: IGameGeneralProfileEditFormModel;
    inventary: IGameInventaryProfileEditFormModel;
    financial: IGameFinancialProfileEditFormModel;
}