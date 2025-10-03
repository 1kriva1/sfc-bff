import { IAvailabilityLimitModel } from "@share/models/common/availability-limit.model";

export interface ITeamSearchFilterGeneralModel {
    city: string | null;
    tags: string[] | null;
    availability: IAvailabilityLimitModel;
    hasLogo: boolean | null;
    locationId: number | null;
}