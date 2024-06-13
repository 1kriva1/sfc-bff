import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IGameRowResultTeamModel {
    emblem: string | empty;
    fullName: string;
    shortName: string;
}

export interface IGameRowResultScoreModel {
    team: IGameRowResultTeamModel;
    value: number | empty;
}

export interface IGameRowResultModel {
    scoreOne: IGameRowResultScoreModel;
    scoreTwo: IGameRowResultScoreModel;
}

export interface IGameRowLocationModel {
    city: string;
    field: {
        name: string;
        photo: string | empty;
        raiting: number;
    }
}

export interface IGameRowDateModel {
    date: Date;
    start: Date;
    end: Date;
}

export interface IGameRowModel {
    name: string;
    location: IGameRowLocationModel;
    date: IGameRowDateModel;
    freePlay: boolean;
    status: IEnumModel<number>;
    result: IGameRowResultModel;
}