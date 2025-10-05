import { mapTeamPlayerModel } from "@share/mappers/team-player.mapper";
import { EnumService } from "@share/services";
import { IAvailabilityModel } from "@share/services/common/availability/availability.model";
import { ITeamModel } from "@share/services/team/general/models/common/team.model";
import { mapAvailabilityEditFormModel } from "@share/utils/http";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ITeamSearchTableModel } from "./team-search-table.model";

export function mapTeamSearchTableModel(
    model: ITeamModel, enumService: EnumService,
    buildActions: ((model: ITeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamSearchTableModel {
    const result: ITeamSearchTableModel = {
        id: model.Id,
        status: model.Status,
        profile: {
            general: {
                name: model.Profile.General.Name,
                description: model.Profile.General.Description,
                logo: model.Profile.General.Logo,
                city: model.Profile.General.City,
                tags: model.Profile.General.Tags,
                availability: model.Profile.General.Availability?.map((availability: IAvailabilityModel) => mapAvailabilityEditFormModel(availability))
            },
            financial: {
                freePlay: model.Profile.Financial.FreePlay,
                hasManiches: model.Profile.Financial.HasManiches
            },
            inventary: {
                shirts: model.Profile.Inventary.Shirts
            }
        },
        players: model.Players.map(teamPlayer => mapTeamPlayerModel(teamPlayer, enumService))
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}