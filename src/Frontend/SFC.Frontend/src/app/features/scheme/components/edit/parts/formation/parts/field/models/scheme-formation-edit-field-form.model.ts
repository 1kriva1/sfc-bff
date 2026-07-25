import { empty } from "ngx-sfc-common";

export interface ISchemeFormationPlayerPositionEditFieldFormModel {
    index: number;
    formationPosition: number;
    x?: number | empty;
    y?: number | empty;
}

export interface ISchemeFormationPlayerEditFieldFormModel {
    player: number | empty;
    position: ISchemeFormationPlayerPositionEditFieldFormModel;
}

export interface ISchemeFormationEditFieldFormModel {
    players: ISchemeFormationPlayerEditFieldFormModel[];
}