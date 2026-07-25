import { EnumService, IGetGameTeamsResponse, IUpdateGameRequest, IUpdateGameTeamsModel, IUpdateGameTeamsRequest } from "@share/services";
import { convertDateToTimestamp, firstOrDefault, isDefined, where } from "ngx-sfc-common";
import { IGameEditPageFormModel } from "./models/game-edit-page-form.model";
import { mapGameTeamModel } from "@share/mappers";
import { getGameTeamActiveStatusEnum, getGameTeamOutOfGameStatusEnum } from "@share/utils";
import { IEnumModel } from "@core/types";
import { IGameEditPageTeamModel } from "./models/game-edit-page.model";
import { GameTeamIndex } from "@share/enums";

export async function mapUpdateGameRequestAsync(value: IGameEditPageFormModel): Promise<IUpdateGameRequest> {
    return {
        Game: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Date: value.profile.general.date,
                    From: convertDateToTimestamp(value.profile.general.from),
                    To: convertDateToTimestamp(value.profile.general.to),
                    Stadium: value.profile.general.stadium
                },
                Financial: {
                    FreeGame: value.profile.financial.freeGame,
                    PayAmount: value.profile.financial.payAmount
                },
                Inventary: {
                    ShirtsRequired: value.profile.inventary.shirtsRequired,
                    ShirtsCount: value.profile.inventary.shirtsCount
                }
            }
        }
    }
}

export function mapUpdateGameTeamRequest(value: IGameEditPageFormModel, model: IGameEditPageTeamModel, enumService: EnumService): IUpdateGameTeamsRequest {
    const gameTeams: IUpdateGameTeamsModel[] = [],
        gameTeamActiveStatusEnum: IEnumModel<number> = getGameTeamActiveStatusEnum(enumService.enums),
        gameTeamOutOfGameStatusEnum: IEnumModel<number> = getGameTeamOutOfGameStatusEnum(enumService.enums);

    if (isDefined(value.main.teamAId)) {
        gameTeams.push({
            Index: GameTeamIndex.A,
            Status: gameTeamActiveStatusEnum.key,
            Team: value.main.teamAId!
        });

        if (isDefined(model.a?.gameTeam.id)) {
            gameTeams.push({
                Index: null,
                Status: gameTeamOutOfGameStatusEnum.key,
                Team: model.a?.gameTeam.id!
            });
        }
    }

    if (isDefined(value.main.teamBId)) {
        gameTeams.push({
            Index: GameTeamIndex.B,
            Status: gameTeamActiveStatusEnum.key,
            Team: value.main.teamBId!
        });

        if (isDefined(model.b?.gameTeam.id)) {
            gameTeams.push({
                Index: null,
                Status: gameTeamOutOfGameStatusEnum.key,
                Team: model.b?.gameTeam.id!
            });
        }
    }

    return {
        GameTeams: gameTeams
    }
}

export function mapGameEditPageTeamModel(response: IGetGameTeamsResponse, enumService: EnumService): IGameEditPageTeamModel {
    const gameTeamsAll = response.GameTeams.map(gameTeam => mapGameTeamModel(gameTeam, enumService)),
        gameTeamActiveStatusEnum: IEnumModel<number> = getGameTeamActiveStatusEnum(enumService.enums),
        activeGameTeams = where(gameTeamsAll, item => item.gameTeam.status == gameTeamActiveStatusEnum.key) || [];

    return {
        a: firstOrDefault(activeGameTeams, item => item.gameTeam.index == GameTeamIndex.A),
        b: firstOrDefault(activeGameTeams, item => item.gameTeam.index == GameTeamIndex.B)
    }
}