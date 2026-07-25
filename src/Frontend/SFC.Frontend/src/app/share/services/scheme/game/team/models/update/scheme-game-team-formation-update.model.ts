import { ISchemeGameTeamPlayerModel } from "./scheme-game-team-player-update.model";

export interface ISchemeGameTeamFormationUpdateModel {
    FormationId: number;
    TypeId: number;
    Players: ISchemeGameTeamPlayerModel[];
}