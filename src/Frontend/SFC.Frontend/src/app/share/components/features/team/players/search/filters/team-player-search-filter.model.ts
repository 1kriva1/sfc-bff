import { IPlayersFilterModel } from "@share/components/features/player/search/filters";

export interface ITeamPlayersFilterModel extends IPlayersFilterModel {
    statuses: number[];
}