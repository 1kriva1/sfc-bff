import { IPlayersFilterModel } from "@share/components/features/player/search/filters";

export interface ITeamEditPlayersInviteFilterModel extends IPlayersFilterModel {
    statuses: number[];
}