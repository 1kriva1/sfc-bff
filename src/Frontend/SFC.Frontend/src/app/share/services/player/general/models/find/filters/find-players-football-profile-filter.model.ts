import { empty } from "ngx-sfc-common";
import { ILimitSearchModel } from "@core/models";

export interface IFindPlayersFootballProfileFilterModel {
    Positions?: number[] | empty;
    PhysicalCondition?: number | empty;
    GameStyles?: number[] | empty;
    WorkingFoot?: number | empty;
    Height?: ILimitSearchModel<number>| empty;
    Weight?: ILimitSearchModel<number>| empty;
    Skill?: number | empty;
}