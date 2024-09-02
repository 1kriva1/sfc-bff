import { IValueModel } from "@core/types";

export interface IGeneralEditModel {
    name: string;
    city: string;
    stadium: IValueModel<number> | null;
    description: string | null;
    tags: string[] | null;
}