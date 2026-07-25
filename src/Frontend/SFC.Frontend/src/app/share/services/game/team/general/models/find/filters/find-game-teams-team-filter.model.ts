import { empty } from "ngx-sfc-common";
import { IFindGameTeamsProfileFilterModel } from "./find-game-teams-profile-filter.model";

export interface IFindGameTeamsTeamFilterModel {
    Profile?: IFindGameTeamsProfileFilterModel | empty;
    Statuses?: number[] | empty;
}