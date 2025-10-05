import { IPlayersFilterModel } from "@share/components/features/player/search/filters";

export interface ITeamEditPlayersSquadFilterModel extends IPlayersFilterModel {
    statuses: number[];
}