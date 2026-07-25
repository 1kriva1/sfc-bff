
import { empty } from "ngx-sfc-common";
import { IGamePlayerModel } from "../player/game-player.model";
import { IGameTeamModel } from "../team/game-team.model";

export interface IGameGeneralProfileModel {
    name: string;
    description: string | empty;
    date: Date;
    from: string;
    to: string;
    stadium: number | empty;
    tags: string[] | empty;
}

export interface IGameFinancialProfileModel {
    freeGame: boolean;
    payAmount: number | empty;
}

export interface IGameInventaryProfileModel {
    shirtsRequired: boolean;
    shirtsCount: number | empty;
}

export interface IGameProfileModel {
    general: IGameGeneralProfileModel;
    financial: IGameFinancialProfileModel;
    inventary: IGameInventaryProfileModel;
}

export interface IGameEntityModel {
    id: number;
    status: number;
    profile: IGameProfileModel;
}

export interface IGameModel {
    game: IGameEntityModel;
    gamePlayers?: IGamePlayerModel[] | empty;
    gameTeams?: IGameTeamModel[] | empty;
}