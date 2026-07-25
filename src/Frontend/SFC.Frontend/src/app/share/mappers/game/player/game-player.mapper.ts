import { EnumService, IGamePlayerServiceModel } from "@share/services";
import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { IGamePlayerModel } from "@share/models/game/player/game-player.model";
import { mapGameTeamModel } from "../team/game-team.mapper";

export function mapGamePlayerModel(model: IGamePlayerServiceModel, enumService: EnumService): IGamePlayerModel {
    return {
        gamePlayer: {
            id: model.Id,
            status: model.Status,
            player: model.Player ? mapPlayerModel(model.Player, enumService) : null!,
            gameTeam: model.GameTeam ? mapGameTeamModel(model.GameTeam, enumService) : null
        }
    };
}