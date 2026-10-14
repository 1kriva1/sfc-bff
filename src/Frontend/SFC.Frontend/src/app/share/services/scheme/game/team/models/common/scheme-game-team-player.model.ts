import { IGameTeamPlayerServiceModel } from "@share/services/game/team/player";
import { ISchemeGameTeamPlayerPositionModel } from "./scheme-game-team-player-position.model";

export interface ISchemeGameTeamPlayerModel {
    GameTeamPlayer: IGameTeamPlayerServiceModel;
    Position: ISchemeGameTeamPlayerPositionModel;
}