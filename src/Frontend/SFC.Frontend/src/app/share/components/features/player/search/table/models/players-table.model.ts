import { ILimitModel } from "@core/models";
import { IPlayerModel } from "@share/models/player/player.model";
import { StatsValue } from "@share/types";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IPlayersTableGeneralProfileAvailabilityModel extends ILimitModel<Date | null> {
    days: number[] | null;
}

export interface IPlayersTableGeneralProfileModel {
    photo: string | null;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IPlayersTableGeneralProfileAvailabilityModel;
}

export interface IPlayersTableFootballProfileModel {
    height: number | null;
    weight: number | null;
    position: number | null;
    workingFoot: number | null;
    gameStyle: number | null;
    skill: number | null;
    physicalCondition: number | null;
}

export interface IPlayersTableModel extends IPlayerModel { 
    actions?: IDropdownMenuItemModel[];
}