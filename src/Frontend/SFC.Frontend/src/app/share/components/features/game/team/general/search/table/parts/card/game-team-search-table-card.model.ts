import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameTeamSearchTableCardModel {
    name: string;
    city: string;
    logo: string | empty;
    status: IEnumModel<number>;
    raiting: number;
    actions: IDropdownMenuItemModel[];
}