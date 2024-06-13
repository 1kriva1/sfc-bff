import { empty } from "ngx-sfc-common";

export interface IGetTeamsCoachItemModel {
    Id: number;
    FirstName: string;
    LastName: string;
    Photo: string | empty;
}

export interface IGetTeamsItemModel {
    Id: number;
    FullName: string;
    ShortName: string;
    City: string;
    Logo: string | empty;
    Schema: string;
    Raiting: number;
    CreatedDate: Date;
    Status: number;
    Coach: IGetTeamsCoachItemModel | empty;
}