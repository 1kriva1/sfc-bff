import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { ISchemeGameTeamPlayerPositionModel } from "./scheme-game-team-player-position.model";

export interface ISchemeGameTeamPlayerModel {
    Player: IPlayerModel;
    Position: ISchemeGameTeamPlayerPositionModel;
}