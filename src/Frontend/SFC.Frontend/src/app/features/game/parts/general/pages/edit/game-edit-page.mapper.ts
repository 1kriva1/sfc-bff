import { EnumService, IGameTeamServiceModel, IUpdateGameRequest } from "@share/services";
import { convertDateTimeToDateOnly, firstOrDefault, where } from "ngx-sfc-common";
import { IGameEditPageFormModel } from "./models/game-edit-page-form.model";
import { mapGameTeamModel } from "@share/mappers";
import { IGameEditPageTeamModel } from "./models/game-edit-page.model";
import { toEnglishLocaleTimeWithTwoDigitsString } from "@core/utils";
import { IGameTeamModel } from "@share/models";
import { Enum } from "@share/enums";

export async function mapUpdateGameRequestAsync(value: IGameEditPageFormModel): Promise<IUpdateGameRequest> {
    return {
        Game: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Location: value.profile.general.location,
                    Availability: {
                        Date: convertDateTimeToDateOnly(value.profile.general.date),
                        From: toEnglishLocaleTimeWithTwoDigitsString(value.profile.general.from),
                        To: toEnglishLocaleTimeWithTwoDigitsString(value.profile.general.to)
                    }
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

export function mapGameEditPageTeamModel(gameTeams: IGameTeamServiceModel[], enumService: EnumService): IGameEditPageTeamModel {
    const gameTeamsAll: IGameTeamModel[] = gameTeams.map(gameTeam => mapGameTeamModel(gameTeam, enumService)),
        activeGameTeams: IGameTeamModel[] = where(gameTeamsAll, item => item.gameTeam.status == Enum.GameTeamStatus.InGame) || [];

    return {
        a: firstOrDefault(activeGameTeams, item => item.gameTeam.index == Enum.GameTeamIndex.A),
        b: firstOrDefault(activeGameTeams, item => item.gameTeam.index == Enum.GameTeamIndex.B)
    }
}