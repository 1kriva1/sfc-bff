import { IEnumModel } from "@core/types";
import { IPlayerModel, ITeamModel, ITeamPlayerModel } from "@share/models";
import { IEnumsModel } from "@share/services";
import { StatsValue } from "@share/types";
import { getStatsRaiting } from "@share/utils";

export function getTeamRaiting(team: ITeamModel): number {
    const teamPlayers: IPlayerModel[] = team.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player),
        teamPlayersStats: StatsValue[] = teamPlayers.map(player => player.stats);
    return getStatsRaiting(teamPlayersStats);
}

export function getTeamTemporaryStatusEnum(enums: IEnumsModel): IEnumModel<number> {
    return enums.teamStatuses[0];
}