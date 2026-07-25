import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeGameTeamSearchTableCardModel {
    name: string;
    formation: number;
    raiting: number;
    actions: IDropdownMenuItemModel[];
}