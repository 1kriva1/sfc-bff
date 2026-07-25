
import { IGameProfileEditFormModel } from "../../components/edit/parts/profile/game-profile-edit-form.model";
import { IGameTeamsEditFormModel } from "./components/edit/parts/teams/game-teams-edit-form.model";

export interface IGameCreatePageFormModel {
    teams: IGameTeamsEditFormModel;
    profile: IGameProfileEditFormModel;
}