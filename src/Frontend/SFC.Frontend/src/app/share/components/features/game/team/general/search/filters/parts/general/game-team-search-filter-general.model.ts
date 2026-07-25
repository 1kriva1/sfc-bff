import { IAvailabilityLimitModel } from "@share/models/common/availability/availability-limit.model";

export interface IGameTeamSearchFilterGeneralModel {
    city: string | null;
    statuses: number[] | null;
    tags: string[] | null;
    availability: IAvailabilityLimitModel;
    hasLogo: boolean | null;
    locationId: number | null;
}