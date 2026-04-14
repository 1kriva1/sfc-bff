import { empty } from "ngx-sfc-common";

export interface IGameGeneralProfileEditFormModel {
    name: string;
    description: string | empty;
    tags: string[] | empty;
    date: Date;
    from: Date;
    to: Date;
    stadium: number | empty;
}