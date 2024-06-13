import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface ITeamRowNameModel {
    short: string;
    full: string;
}

export interface ITeamRowCoachModel {
    id: number;
    firstName: string;
    lastName: string;
    photo: string | empty;
}

export interface ITeamRowModel {
    name: ITeamRowNameModel;
    city: string;
    logo: string | empty;
    schema: string | empty;
    raiting: number;
    createdDate: Date;
    status: IEnumModel<number>;
    coach: ITeamRowCoachModel | empty;
}