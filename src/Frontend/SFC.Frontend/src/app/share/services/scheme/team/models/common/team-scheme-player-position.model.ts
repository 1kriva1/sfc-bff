import { empty } from "ngx-sfc-common";

export interface ITeamSchemePositionModel {
    Index: number;
    FormationPositionId: number;  
    X?: number | empty;
    Y?: number | empty;  
}