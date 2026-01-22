import { IPlayerModel, ITeamModel, ITeamPlayerModel } from "@share/models";
import { StatsValue } from "@share/types";
import { getStatsRaiting } from "@share/utils";

export function getTeamRaiting(team: ITeamModel): number {
    const teamPlayers: IPlayerModel[] = team.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player),
        teamPlayersStats: StatsValue[] = teamPlayers.map(player => player.stats);
    return getStatsRaiting(teamPlayersStats);
}