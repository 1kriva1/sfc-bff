import { IAvailabilityModel } from "@share/services/common/availability/availability.model";
import { ITeamPlayerModel } from "@share/services/team/player/models/common/team-player.model";
import { empty } from "ngx-sfc-common";

export interface ITeamGeneralProfileModel {
    Name: string;
    City: string;
    Description: string | empty;
    Logo: string | empty;
    Tags: string[] | empty;
    Availability: IAvailabilityModel[] | empty;
}

export interface ITeamFinancialProfileModel {
    FreePlay: boolean;
    HasManiches: boolean;
}

export interface ITeamInventaryProfileModel {
    Shirts: number[] | empty;
}

export interface ITeamProfileModel {
    General: ITeamGeneralProfileModel;
    Financial: ITeamFinancialProfileModel;
    Inventary: ITeamInventaryProfileModel;
}

export interface ITeamModel {
    Id: number;
    Status: number;
    Profile: ITeamProfileModel;
    Players: ITeamPlayerModel[];
}