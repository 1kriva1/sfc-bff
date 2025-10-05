import { IPlayerAvailabilityModel } from "./player-availability.model";

export interface IPlayerGeneralProfileModel {
    Photo: string | null;
    FirstName: string;
    LastName: string;
    Birthday: Date | null;
    City: string;
    Tags: string[] | null;
    FreePlay: boolean;
    Availability: IPlayerAvailabilityModel;
}