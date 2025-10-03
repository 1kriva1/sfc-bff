import { IValueModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface ITeamGeneralProfileEditFormModel {
    name: string;
    city: string;
    stadium: IValueModel<number> | null;
    description: string | empty;
    tags: string[] | empty;
}