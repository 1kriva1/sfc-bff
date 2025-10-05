import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { ITeamSchemePositionModel } from "./team-scheme-player-position.model";

export interface ITeamSchemePlayerModel {
    Player: IPlayerModel;
    Position: ITeamSchemePositionModel;
}