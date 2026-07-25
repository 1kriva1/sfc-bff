import { empty } from "ngx-sfc-common";

export interface ISchemeGameTeamPlayerPositionModel {
    Index: number;
    FormationPositionId: number;  
    X?: number | empty;
    Y?: number | empty;  
}