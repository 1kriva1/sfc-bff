import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeTeamSearchTableRowModel {
    name: string;
    comment: string | empty;
    formation: number;
    raiting: number;
    playersSelected: number;
    playersTotal: number;
    actions: IDropdownMenuItemModel[];
}