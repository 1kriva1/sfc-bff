import { empty } from "ngx-sfc-common";

export interface IGetGamesItemResultTeamModel {
    Emblem: string | empty;
    FullName: string;
    ShortName: string;
}

export interface IGetGamesItemResultScoreModel {
    Team: IGetGamesItemResultTeamModel;
    Value: number | empty;
}

export interface IGetGamesItemResultModel {
    ScoreOne: IGetGamesItemResultScoreModel;
    ScoreTwo: IGetGamesItemResultScoreModel;
}

export interface IGetGamesItemLocationModel {
    City: string;
    Field: {
        Name: string;
        Photo: string | empty;
        Raiting: number;
    }
}

export interface IGetGamesItemDateModel {
    Date: Date;
    Start: Date;
    End: Date;
}

export interface IGetGamesItemModel {
    Id: number;
    Name: string;
    Location: IGetGamesItemLocationModel;
    Date: IGetGamesItemDateModel;
    FreePlay: boolean;
    Status: number;
    Result: IGetGamesItemResultModel;
}