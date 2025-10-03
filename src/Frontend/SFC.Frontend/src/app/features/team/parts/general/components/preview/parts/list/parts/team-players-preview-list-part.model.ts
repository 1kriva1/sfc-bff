import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamPlayersPreviewListPartModel {
    id: number;
    photo: string;
    firstName: string;
    lastName: string;
    city: string;
    raiting: number;
    age: number | null;
    stars: number;
    position: IEnumModel<number> | empty;
    actions?: IDropdownMenuItemModel[];
}