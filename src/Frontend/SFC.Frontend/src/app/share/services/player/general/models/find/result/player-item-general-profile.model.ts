import { IPlayerItemAvailabilityModel } from "./player-item-availability.model";

export interface IPlayerItemGeneralProfileModel {
    Photo: string | null;
    FirstName: string;
    LastName: string;
    Birthday: Date | null;
    City: string;
    Tags: string[] | null;
    FreePlay: boolean;
    Availability: IPlayerItemAvailabilityModel;
}