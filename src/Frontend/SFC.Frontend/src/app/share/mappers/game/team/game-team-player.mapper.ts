import { EnumService, IGameTeamPlayerServiceModel } from "@share/services";
import { mapTeamModel } from "@share/mappers/team/general/team.mapper";
import { IGameTeamPlayerModel } from "@share/models/game";
import { mapPlayerModel } from "@share/mappers/player/player.mapper";

export function mapGameTeamPlayerModel(model: IGameTeamPlayerServiceModel, enumService: EnumService): IGameTeamPlayerModel {
    return {
        gameTeamPlayer: {
            id: model.Id,
            status: model.Status,
            player: model.Player ? mapPlayerModel(model.Player, enumService) : null!,
            team: model.Team ? mapTeamModel(model.Team, enumService) : null!
        }
    };
}