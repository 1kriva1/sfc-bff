import { EnumService, IGameTeamPlayerServiceModel } from "@share/services";
import { IGameTeamPlayerModel } from "@share/models/game";
import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { mapGameTeamModel } from "./game-team.mapper";

export function mapGameTeamPlayerModel(model: IGameTeamPlayerServiceModel, enumService: EnumService): IGameTeamPlayerModel {
    return {
        gameTeamPlayer: {
            id: model.Id,
            status: model.Status,
            player: model.Player ? mapPlayerModel(model.Player, enumService) : null!,
            gameTeam: model.GameTeam ? mapGameTeamModel(model.GameTeam, enumService) : null!
        }
    };
}