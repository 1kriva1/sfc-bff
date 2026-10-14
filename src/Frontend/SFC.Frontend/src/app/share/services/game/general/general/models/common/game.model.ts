import { IGamePlayerModel } from "@share/services/game/player/general/models/common/game-player.model";
import { IGameTeamModel } from "@share/services/game/team/general/models/common/game-team.model";
import { empty } from "ngx-sfc-common";

export interface IGameGeneralProfileModel {
    Name: string;
    Description: string | empty;
    Location: number | empty;
    Tags: string[] | empty;
    Availability: IGameAvailabilityModel;
}

export interface IGameAvailabilityModel {
    Date: string;
    From: string;
    To: string;
}

export interface IGameFinancialProfileModel {
    FreeGame: boolean;
    PayAmount: number | empty;
}

export interface IGameInventaryProfileModel {
    ShirtsRequired: boolean;
    ShirtsCount: number | empty;
}

export interface IGameProfileModel {
    General: IGameGeneralProfileModel;
    Financial: IGameFinancialProfileModel;
    Inventary: IGameInventaryProfileModel;
}

export interface IGameModel {
    Id: number;
    Status: number;
    Profile: IGameProfileModel;
    Players?: IGamePlayerModel[] | empty;
    Teams?: IGameTeamModel[] | empty;
}