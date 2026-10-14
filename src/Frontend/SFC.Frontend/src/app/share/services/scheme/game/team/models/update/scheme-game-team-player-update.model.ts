import { ITeamSchemePositionModel } from "@share/services/scheme/team/general/models/common/team-scheme-player-position.model";

export interface ISchemeGameTeamPlayerModel {
    GameTeamPlayerId: number;
    Position: ITeamSchemePositionModel;
}