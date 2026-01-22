import { ILimitSearchModel } from "@core/models";
import { empty } from "ngx-sfc-common";

export interface IStatisticSearchModel  extends ILimitSearchModel<Date>{
    Period?: number | empty;
}
