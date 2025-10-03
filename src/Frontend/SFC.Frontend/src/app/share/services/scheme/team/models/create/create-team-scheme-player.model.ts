import { ITeamSchemePositionModel } from "@share/services/scheme/team/models/common/team-scheme-player-position.model";

export interface ICreateTeamSchemePlayerModel {
    PlayerId: number;
    Position: ITeamSchemePositionModel;
}