import { empty } from "ngx-sfc-common";

export interface ISchemeGameTeamFormationPlayerPositionEditFieldFormModel {
    index: number;
    formationPosition: number;
    x?: number | empty;
    y?: number | empty;
}

export interface ISchemeGameTeamFormationPlayerEditFieldFormModel {
    gameTeamPlayerId: number | empty;
    position: ISchemeGameTeamFormationPlayerPositionEditFieldFormModel;
}

export interface ISchemeGameTeamFormationEditFieldFormModel {
    players: ISchemeGameTeamFormationPlayerEditFieldFormModel[];
}