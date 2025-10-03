import { convertFileFromBase64StringAsync, convertFileToBase64StringAsync } from "@core/utils";
import { IAvailabilityEditFormModel } from "@share/components/availability-edit/availability-edit-form.model";
import { mapPlayerTableModel } from "@share/components/features/player/search/mappers";
import { ITeamPlayerModel } from "@share/models/team/team-player.model";
import { EnumService, IUpdateTeamRequest } from "@share/services";
import { IAvailabilityModel } from "@share/services/common/availability/availability.model";
import { ITeamModel } from "@share/services/team/general/models/common/team.model";
import { ITeamPlayerModel as ITeamPlayerServiceModel } from "@share/services/team/player/models/common/team-player.model";
import { mapAvailabilityEditFormModel, mapAvailabilityModel } from "@share/utils/http";
import { TeamEditPageFormModel } from "./team-edit-page-form.model";

export async function mapTeamEditPageFormModelAsync(value: ITeamModel): Promise<TeamEditPageFormModel> {
    return {
        id: value.Id,
        main: {
            logo: await convertFileFromBase64StringAsync(value.Profile.General.Logo),
        },
        profile: {
            general: {
                city: value.Profile.General.City,
                description: value.Profile.General.Description,
                name: value.Profile.General.Name,
                stadium: null,
                tags: value.Profile.General.Tags
            },
            availability: {
                value: value.Profile.General.Availability?.map((availability: IAvailabilityModel) => mapAvailabilityEditFormModel(availability))
            },
            financial: {
                freePlay: value.Profile.Financial.FreePlay,
                hasManiches: value.Profile.Financial.HasManiches || false,
                shirts: value.Profile.Inventary.Shirts
            }
        }
    };
}

export function mapEditTeamPlayerModel(model: ITeamPlayerServiceModel, enumService: EnumService): ITeamPlayerModel {
    return {
        id: model.Id,
        status: model.Status,
        player: mapPlayerTableModel(model.Player, enumService)
    }
}

export async function mapUpdateTeamRequestAsync(value: TeamEditPageFormModel): Promise<IUpdateTeamRequest> {
    return {
        Team: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    City: value.profile.general.city,
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Logo: await convertFileToBase64StringAsync(value.main.logo),
                    Availability: value.profile.availability.value?.map((availability: IAvailabilityEditFormModel) => mapAvailabilityModel(availability))
                },
                Financial: {
                    FreePlay: value.profile.financial.freePlay || false,
                    HasManiches: value.profile.financial.hasManiches || false,
                },
                Inventary: {
                    Shirts: value.profile.financial.shirts
                }
            }
        }
    }
}