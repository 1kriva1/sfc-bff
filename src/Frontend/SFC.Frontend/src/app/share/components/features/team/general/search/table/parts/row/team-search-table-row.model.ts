import { IEnumModel } from "@share/models";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamSearchTableRowModel {
    id: number;
    name: string;
    city: string;
    logo: string | empty;
    status: IEnumModel<number>;
    raiting: number;
    players: number;
    actions: IDropdownMenuItemModel[];
}