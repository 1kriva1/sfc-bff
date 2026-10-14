import { empty } from "ngx-sfc-common";

export interface ISchemeTeamFormationPlayerPositionEditFieldFormModel {
    index: number;
    formationPosition: number;
    x?: number | empty;
    y?: number | empty;
}

export interface ISchemeTeamFormationPlayerEditFieldFormModel {
    player: number | empty;
    position: ISchemeTeamFormationPlayerPositionEditFieldFormModel;
}

export interface ISchemeTeamFormationEditFieldFormModel {
    players: ISchemeTeamFormationPlayerEditFieldFormModel[];
}