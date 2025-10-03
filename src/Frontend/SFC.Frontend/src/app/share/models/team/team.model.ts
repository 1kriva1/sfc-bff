import { IAvailabilityEditFormModel } from "@share/components/availability-edit/availability-edit-form.model";
import { empty } from "ngx-sfc-common";
import { ITeamPlayerModel } from "./team-player.model";

export interface ITeamGeneralProfileModel {
    name: string;
    city: string;
    description: string | empty;
    logo: string | empty;
    tags: string[] | empty;
    availability: IAvailabilityEditFormModel[] | empty;
}

export interface ITeamFinancialProfileModel {
    freePlay: boolean;
    hasManiches: boolean;
}

export interface ITeamInventaryProfileModel {
    shirts: number[] | empty;
}

export interface ITeamProfileModel {
    general: ITeamGeneralProfileModel;
    financial: ITeamFinancialProfileModel;
    inventary: ITeamInventaryProfileModel;
}

export interface ITeamModel {
    id: number;
    status: number;
    profile: ITeamProfileModel;
    players: ITeamPlayerModel[];
}