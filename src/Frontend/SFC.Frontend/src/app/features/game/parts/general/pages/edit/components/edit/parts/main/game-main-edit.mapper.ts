import { Enum } from "@share/enums";
import { IUpdateGameTeamsModel, IUpdateGameTeamsRequest } from "@share/services";
import { empty, isDefined } from "ngx-sfc-common";

export function mapUpdateGameTeamRequest(
    currentTeamAId: number | empty,
    previousTeamAId: number | empty,
    index: number): IUpdateGameTeamsRequest {
    const gameTeams: IUpdateGameTeamsModel[] = [];

    if (isDefined(currentTeamAId)) {
        gameTeams.push({
            Index: index,
            Status: Enum.GameTeamStatus.InGame,
            Team: currentTeamAId!
        });
    }

    if (isDefined(previousTeamAId)) {
        gameTeams.push({
            Index: null,
            Status: Enum.GameTeamStatus.OutOfGame,
            Team: previousTeamAId!
        });
    }

    return {
        GameTeams: gameTeams
    }
}