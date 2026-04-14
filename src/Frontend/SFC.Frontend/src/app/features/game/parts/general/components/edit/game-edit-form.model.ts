import { IGameProfileEditFormModel } from "./parts/profile/game-profile-edit-form.model";
import { IGameTeamsEditFormModel } from "./parts/teams/game-teams-edit-form.model";

export interface IGameEditFormModel {
    teams: IGameTeamsEditFormModel;
    profile: IGameProfileEditFormModel;
}