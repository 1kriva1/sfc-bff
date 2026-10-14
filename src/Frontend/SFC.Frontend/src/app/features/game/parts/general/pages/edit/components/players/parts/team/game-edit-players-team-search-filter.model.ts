import { ITeamPlayerSearchFilterModel } from "@share/components";

export interface IGameEditPlayersTeamSearchFilterModel extends ITeamPlayerSearchFilterModel {
    team?: number;
}