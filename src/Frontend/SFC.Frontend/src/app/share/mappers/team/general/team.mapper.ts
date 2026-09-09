import { ITeamModel } from "@share/models/team/general/team.model";
import { EnumService } from "@share/services";
import { IAvailabilityModel } from "@share/services/common/availability/availability.model";
import { ITeamModel as ITeamHttpModel } from "@share/services/team/general/general/models/common/team.model"
import { mapAvailabilityEditFormModel } from "@share/utils/http";
import { mapTeamPlayerModel } from "../player/team-player.mapper";

export function mapTeamModel(model: ITeamHttpModel, enumService: EnumService): ITeamModel {
    return {
        id: model.Id,
        status: model.Status,
        profile: {
            general: {
                logo: model.Profile.General.Logo,
                city: model.Profile.General.City,
                description: model.Profile.General.Description,
                name: model.Profile.General.Name,
                tags: model.Profile.General.Tags,
                availability: model.Profile.General.Availability?.map((availability: IAvailabilityModel) => mapAvailabilityEditFormModel(availability))
            },
            inventary: {
                shirts: model.Profile.Inventary.Shirts
            },
            financial: {
                freePlay: model.Profile.Financial.FreePlay,
                hasManiches: model.Profile.Financial.HasManiches || false
            }
        },
        players: model.Players?.map(teamPlayer => mapTeamPlayerModel(teamPlayer, enumService)) || []
    }
}