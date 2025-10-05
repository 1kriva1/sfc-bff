import { IUpdateTeamSchemePlayerModel } from "./update-team-scheme-player.model";

export interface IUpdateTeamSchemeFormationModel {
    FormationId: number;
    TypeId: number;
    Players: IUpdateTeamSchemePlayerModel[];
}