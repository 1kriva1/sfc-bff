import { IAvailabilityDateLimitModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface IGameSearchFilterGeneralModel {
    name?: string | empty;
    statuses?: number[] | empty;
    tags?: string[] | empty;
    availability?: IAvailabilityDateLimitModel | empty;
    location?: number | empty;
}