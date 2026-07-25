import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGamePlayerTeamSearchTableCardModel {
    name: string;
    city: string;
    logo: string | empty;
    raiting: number;
}

export interface IGamePlayerSearchTableCardModel {
    firstName: string;
    lastName: string;
    city: string;
    photo?: string | empty;
    birthday: Date | empty;
    status?: number | empty;
    stats: StatsValue;
    position?: number | empty;
    team?: IGamePlayerTeamSearchTableCardModel;
    actions?: IDropdownMenuItemModel[] | empty;
}