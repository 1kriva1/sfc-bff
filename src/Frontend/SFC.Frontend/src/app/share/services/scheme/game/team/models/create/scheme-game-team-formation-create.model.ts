import { ISchemeGameTeamPlayerCreateModel } from "./scheme-game-team-player-create.model";

export interface ISchemeGameTeamFormationCreateModel {
    FormationId: number;
    TypeId: number;
    Players: ISchemeGameTeamPlayerCreateModel[];
}