import { IGameTeamPlayersEditFormModel } from "../components/edit/parts/players/game-team-players-edit-form.model";
import { IGameTeamProfileEditFormModel } from "../../../components/edit/parts/profile/game-team-profile-edit-form.model";

export interface IGameTeamCreatePageFormModel {
    profile: IGameTeamProfileEditFormModel;
    players: IGameTeamPlayersEditFormModel;
}