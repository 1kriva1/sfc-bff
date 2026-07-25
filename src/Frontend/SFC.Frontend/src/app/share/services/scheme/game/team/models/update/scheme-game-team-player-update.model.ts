import { ITeamSchemePositionModel } from "@share/services/scheme/team/general/models/common/team-scheme-player-position.model";

export interface ISchemeGameTeamPlayerModel {
    PlayerId: number;
    Position: ITeamSchemePositionModel;
}