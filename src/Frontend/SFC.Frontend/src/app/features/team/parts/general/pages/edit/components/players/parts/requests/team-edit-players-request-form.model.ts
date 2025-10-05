import { IPlayersFilterModel } from "@share/components/features/player/search/filters";

export interface ITeamEditPlayersRequestFilterModel extends IPlayersFilterModel {
    statuses: number[];
}