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
                    date: model.Profile.General.Date,
                    from: model.Profile.General.From,
                    to: model.Profile.General.To,
                    stadium: model.Profile.General.Stadium,
                    tags: model.Profile.General.Tags
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