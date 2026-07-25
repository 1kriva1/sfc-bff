
import { EnumService } from "@share/services";
import { mapPlayerModel } from "../player/player.mapper";
import { mapGameModel } from "../game/general/game.mapper";
import { IRequestGamePlayerServiceModel } from "@share/services/request/game";
import { IRequestGamePlayerModel } from "@share/models";

export function mapRequestGamePlayerModel(model: IRequestGamePlayerServiceModel, enumService: EnumService): IRequestGamePlayerModel {
    return {
        id: model.Id,
        status: model.Status,
        playerComment: model.PlayerComment,
        gameComment: model.GameComment,
        player: mapPlayerModel(model.Player, enumService),
        game: mapGameModel(model.Game, enumService),
    };
}