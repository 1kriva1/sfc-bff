import { EnumService, IGameServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IGameSearchTableModel } from "./game-search-table.model";
import { mapGameTeamModel } from "@share/mappers";

export function mapGameSearchTableModel(
    model: IGameServiceModel,
    enumService: EnumService,
    buildActions: ((model: IGameSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IGameSearchTableModel {
    const result: IGameSearchTableModel = {
        game: {
            id: model.Id,
            status: model.Status,
            profile: {
                general: {
                    name: model.Profile.General.Name,
                    description: model.Profile.General.Description,
                    tags: model.Profile.General.Tags,
                    availability: {
                        date: model.Profile.General.Availability.Date,
                        from: model.Profile.General.Availability.From,
                        to: model.Profile.General.Availability.To
                    },
                    location: model.Profile.General.Location
                },
                financial: {
                    freeGame: model.Profile.Financial.FreeGame,
                    payAmount: model.Profile.Financial.PayAmount
                },
                inventary: {
                    shirtsRequired: model.Profile.Inventary.ShirtsRequired,
                    shirtsCount: model.Profile.Inventary.ShirtsCount
                }
            }
        },
        gameTeams: model.Teams?.map(gameTeam => mapGameTeamModel(gameTeam, enumService)) 
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}