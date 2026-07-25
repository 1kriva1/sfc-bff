import { ICreateTeamSchemePlayerModel } from "./create-team-scheme-player.model";

export interface ICreateTeamSchemeFormationModel {
    FormationId: number;
    TypeId: number;
    Players: ICreateTeamSchemePlayerModel[];
}