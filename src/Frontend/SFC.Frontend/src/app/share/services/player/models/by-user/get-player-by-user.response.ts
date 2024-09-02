import { BaseErrorResponse } from "@core/models";

export interface IPlayerByUserGeneralProfileModel {
    Photo: string | null;
    FirstName: string;
    LastName: string;
}

export interface IPlayerByUserFootballProfileModel {
    Position: number | null;
}

export interface IPlayerByUserProfileModel {
    General: IPlayerByUserGeneralProfileModel;
    Football: IPlayerByUserFootballProfileModel;
}

export interface IPlayerByUserModel {
    Id: number;
    Profile: IPlayerByUserProfileModel;
}

export interface IGetPlayerByUserResponse extends BaseErrorResponse {
    Player: IPlayerByUserModel;
}