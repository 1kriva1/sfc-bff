import { ISchemeGameTeamPlayerModel } from "./scheme-game-team-player.model";

export interface ISchemeGameTeamFormationModel {
    FormationId: number;
    TypeId: number;
    Players: ISchemeGameTeamPlayerModel[];
}