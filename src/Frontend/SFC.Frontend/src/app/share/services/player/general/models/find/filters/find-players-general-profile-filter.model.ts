import { empty } from "ngx-sfc-common";
import { ILimitSearchModel } from "@core/models";
import { IAvailabilityLimitSearchModel } from "./availability-limit-search.model";

export interface IFindPlayersGeneralProfileFilterModel {
    Name: string | null;
    City?: string | empty;
    Tags?: string[] | empty;
    Years?: ILimitSearchModel<number> | empty;
    Availability?: IAvailabilityLimitSearchModel | empty;
    FreePlay?: boolean | empty;
    HasPhoto?: boolean | empty;
}