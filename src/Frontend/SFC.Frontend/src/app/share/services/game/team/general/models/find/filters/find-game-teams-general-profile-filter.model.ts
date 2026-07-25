import { empty } from "ngx-sfc-common";
import { IAvailabilityLimitSearchModel } from "@share/services/common/availability/availability-limit-search.model";

export interface IFindGameTeamsGeneralProfileFilterModel {
    Name?: string | empty;
    City?: string | empty;
    Tags?: string[] | empty;
    Availability?: IAvailabilityLimitSearchModel | empty;
    HasLogo?: boolean | empty;
    LocationId?: number | empty;
}