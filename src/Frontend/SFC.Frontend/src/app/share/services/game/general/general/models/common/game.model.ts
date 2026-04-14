import { empty } from "ngx-sfc-common";

export interface IGameGeneralProfileModel {
    Name: string;
    Description: string | empty;    
    Day: Date;
    From: string;
    To: string;
    Stadium: number;
    Tags: string[] | empty;
}

export interface IGameFinancialProfileModel {
    FreeGame: boolean;
    PayAmount: number | empty;
}

export interface IGameInventaryProfileModel {
    ShirtsRequired: boolean;
    ShirtsCount: number | empty;
}

export interface IGameProfileModel {
    General: IGameGeneralProfileModel;
    Financial: IGameFinancialProfileModel;
    Inventary: IGameInventaryProfileModel;
}

export interface IGameModel {
    Id: number;
    Status: number;
    Profile: IGameProfileModel;
}