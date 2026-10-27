import { IEnumModel } from "@share/models";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IGameInfoTeamInfoModel } from "../../../../info/game-info.model";

export interface IGameSearchTableCardModel {
    name: string;
    tags?: string[] | empty;
    location?: string | empty;
    date: string;
    from: string;
    to: string;
    status: IEnumModel<number>;
    teams?: IGameInfoTeamInfoModel[] | empty;
    actions: IDropdownMenuItemModel[];
}