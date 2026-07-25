import { empty } from "ngx-sfc-common";

export interface IGameTeamGeneralProfileEditFormModel {
    name: string;
    logo: File | empty;
    description: string | empty;
    tags: string[] | empty;
}