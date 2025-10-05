import { empty } from "ngx-sfc-common";

export interface ITeamInfoModel {    
    name?: string | empty;
    city?: string | empty;
    logo?: string | empty;
    raiting?: number | empty;
}