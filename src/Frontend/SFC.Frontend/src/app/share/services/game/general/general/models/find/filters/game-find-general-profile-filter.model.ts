import { empty } from "ngx-sfc-common";
import { IAvailabilityDateLimitSearchModel } from "@share/services/common";

export interface IGameFindGeneralProfileFilterModel {
    Name?: string | empty;
    Tags?: string[] | empty;
    Availability?: IAvailabilityDateLimitSearchModel | empty;
    Location?: number | empty;
}