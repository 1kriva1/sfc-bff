import { IPlayersFilterModel } from "@share/components/features/player";
import { ITeamPlayerFilterModel } from "./team-player-filter.model";

// TODO - Legacy
export interface ITeamPlayersFilterModel extends IPlayersFilterModel {
    statuses: number[];
}
// End TODO - Legacy

export interface ITeamPlayerSearchFilterModel {
    name?: string | null;
    player?: IPlayersFilterModel;
    teamPlayer?: ITeamPlayerFilterModel;
}