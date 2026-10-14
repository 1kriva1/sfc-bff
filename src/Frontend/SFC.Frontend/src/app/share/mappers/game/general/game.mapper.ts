import { EnumService, IGameServiceModel } from "@share/services";
import { IGameModel } from "@share/models/game";

export function mapGameModel(model: IGameServiceModel, enumService: EnumService): IGameModel {
    return {
        game: {
            id: model.Id,
            status: model.Status,
            profile: {
                general: {
                    name: model.Profile.General.Name,
                    description: model.Profile.General.Description,
                    location: model.Profile.General.Location,
                    tags: model.Profile.General.Tags,
                    availability: {
                        date: model.Profile.General.Availability.Date,
                        from: model.Profile.General.Availability.From,
                        to: model.Profile.General.Availability.To,
                    }
                },
                inventary: {
                    shirtsRequired: model.Profile.Inventary.ShirtsRequired,
                    shirtsCount: model.Profile.Inventary.ShirtsCount
                },
                financial: {
                    freeGame: model.Profile.Financial.FreeGame,
                    payAmount: model.Profile.Financial.PayAmount
                }
            }
        }
    }
}