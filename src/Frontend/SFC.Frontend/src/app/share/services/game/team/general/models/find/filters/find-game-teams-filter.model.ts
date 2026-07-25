import { empty } from "ngx-sfc-common";
import { IFindGameTeamsTeamFilterModel } from "./find-game-teams-team-filter.model";
import { IFindGameTeamsGameTeamFilterModel } from "./find-game-teams-game-team-filter.model";

export interface IFindGameTeamsFilterModel {
    Team?: IFindGameTeamsTeamFilterModel | empty;
    GameTeam?: IFindGameTeamsGameTeamFilterModel | empty;
}