import { empty } from "ngx-sfc-common";

export interface ISchemeInfoModel {
    name?: string | empty;
    description?: string | empty;
    label?: string | empty;
    avatar?: string | empty;
    raiting?: number | empty;
}