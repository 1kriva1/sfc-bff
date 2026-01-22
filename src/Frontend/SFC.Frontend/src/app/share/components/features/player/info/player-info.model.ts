import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IPlayerInfoModel {
    photo?: string | empty;
    raiting?: number | empty;
    firstName?: string | empty;
    lastName?: string | empty;
    city?: string | empty;
    position?: IEnumModel<number> | empty;
    age?: number | empty;
}