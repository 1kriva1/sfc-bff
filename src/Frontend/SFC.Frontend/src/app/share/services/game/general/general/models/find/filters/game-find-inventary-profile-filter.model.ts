import { ILimitSearchModel } from "@core/models";
import { empty } from "ngx-sfc-common";

export interface IGameFindInventaryProfileFilterModel {
    ShirtsRequired?: boolean | empty;
    ShirtsCount?: ILimitSearchModel<number> | empty;
}