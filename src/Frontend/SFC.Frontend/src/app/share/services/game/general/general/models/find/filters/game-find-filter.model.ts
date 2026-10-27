import { empty } from "ngx-sfc-common";
import { IGameFindProfileFilterModel } from "./game-find-profile-filter.model";

export interface IGameFindFilterModel {
    Statuses?: number[] | empty;
    Profile?: IGameFindProfileFilterModel | empty;
}