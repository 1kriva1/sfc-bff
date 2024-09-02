import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IPlayerItemModel {
    id:number;
    photo: string;
    firstName: string;
    lastName: string;
    city: string;
    raiting: number;
    age: number | null;
    stars: number;
    position: IEnumModel<number> | empty;
}