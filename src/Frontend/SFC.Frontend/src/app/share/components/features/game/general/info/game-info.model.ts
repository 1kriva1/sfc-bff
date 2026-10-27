import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameInfoModel {
    name?: string | empty;
    location?: string | empty;
    date?: string | empty;
    from?: string | empty;
    to?: string | empty;
    tags?: string[] | empty;
    status?: number | empty;
    teams?: IGameInfoTeamInfoModel[] | empty;
    actions?: IDropdownMenuItemModel[] | empty;
}

export interface IGameInfoTeamInfoModel {
    id: number;
    index: number | empty;
    name?: string | empty;
    city?: string | empty;
    logo?: string | empty;
    raiting?: number | empty;
    result?: IGameInfoTeamInfoResultInfoModel;
}

export interface IGameInfoTeamInfoResultInfoModel {
    score: number;
}