
import { IGameProfileEditFormModel } from "../../../components/edit/parts/profile/game-profile-edit-form.model";
import { IGameMainEditFormModel } from "../components/edit/parts/main/game-main-edit-form.model";

export interface IGameEditPageFormModel {
    main: IGameMainEditFormModel;
    profile: IGameProfileEditFormModel;
}