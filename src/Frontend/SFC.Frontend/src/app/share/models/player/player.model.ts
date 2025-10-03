import { ILimitModel } from "@core/models";
import { StatsValue } from "@share/types";

export interface IPlayerGeneralProfileAvailabilityModel extends ILimitModel<Date | null> {
    days: number[] | null;
}

export interface IPlayerGeneralProfileModel {
    photo: string | null;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IPlayerGeneralProfileAvailabilityModel;
}

export interface IPlayerFootballProfileModel {
    height: number | null;
    weight: number | null;
    position: number | null;
    workingFoot: number | null;
    gameStyle: number | null;
    skill: number | null;
    physicalCondition: number | null;
}

export interface IPlayerModel {
    id: number;
    general: IPlayerGeneralProfileModel;
    football: IPlayerFootballProfileModel;
    stats: StatsValue;
}