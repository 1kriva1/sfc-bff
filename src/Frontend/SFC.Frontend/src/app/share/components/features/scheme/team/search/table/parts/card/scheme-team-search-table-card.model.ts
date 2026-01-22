import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeTeamSearchTableCardModel {
    name: string;
    formation: number;
    raiting: number;
    actions: IDropdownMenuItemModel[];
}