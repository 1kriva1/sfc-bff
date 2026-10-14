import { IEnumModel } from "@core/types";
import { EnumService, IUpdateGameTeamsModel, IUpdateGameTeamsRequest } from "@share/services";
import { getGameTeamActiveStatusEnum, getGameTeamOutOfGameStatusEnum, getGameTeamAIndexEnum, getGameTeamBIndexEnum } from "@share/utils";
import { empty, isDefined } from "ngx-sfc-common";

export function mapUpdateGameTeamRequest(
    currentTeamAId: number | empty,
    previousTeamAId: number | empty,
    index: IEnumModel<number>,
    enumService: EnumService): IUpdateGameTeamsRequest {
    const gameTeams: IUpdateGameTeamsModel[] = [],
        gameTeamActiveStatusEnum: IEnumModel<number> = getGameTeamActiveStatusEnum(enumService.enums),
        gameTeamOutOfGameStatusEnum: IEnumModel<number> = getGameTeamOutOfGameStatusEnum(enumService.enums),
        gameTeamAIndexEnum: IEnumModel<number> = getGameTeamAIndexEnum(enumService.enums),
        gameTeamBIndexEnum: IEnumModel<number> = getGameTeamBIndexEnum(enumService.enums);

    if (isDefined(currentTeamAId)) {
        gameTeams.push({
            Index: index.key === gameTeamAIndexEnum.key ? gameTeamAIndexEnum.key : gameTeamBIndexEnum.key,
            Status: gameTeamActiveStatusEnum.key,
            Team: currentTeamAId!
        });
    }

    if (isDefined(previousTeamAId)) {
        gameTeams.push({
            Index: null,
            Status: gameTeamOutOfGameStatusEnum.key,
            Team: previousTeamAId!
        });
    }

    return {
        GameTeams: gameTeams
    }
}