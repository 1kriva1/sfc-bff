import { ITeamSchemePositionModel } from "@share/services/scheme/team/models/common/team-scheme-player-position.model";

export interface IUpdateTeamSchemePlayerModel {
    PlayerId: number;
    Position: ITeamSchemePositionModel;
}