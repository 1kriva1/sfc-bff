import { IAvailabilityLimitModel } from "@share/models/common/availability-limit.model";

export interface ITeamSearchFilterGeneralModel {
    city: string | null;
    statuses: number[] | null;
    tags: string[] | null;
    availability: IAvailabilityLimitModel;
    hasLogo: boolean | null;
    locationId: number | null;
}