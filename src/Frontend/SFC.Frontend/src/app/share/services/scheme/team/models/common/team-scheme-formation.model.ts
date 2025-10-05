import { ITeamSchemePlayerModel } from "./team-scheme-player.model";

export interface ITeamSchemeFormationModel {
    FormationId: number;
    TypeId: number;
    Players: ITeamSchemePlayerModel[];
}